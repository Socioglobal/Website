/**
 * GoHighLevel delivery.
 *
 * Every form on the site — the calculator breakdown, the checklist, the tier
 * enquiries and the booking request — lands here, so a lead becomes a GHL
 * contact with tags a workflow can branch on.
 *
 * Two transports, either or both:
 *
 *   1. API v2 (preferred). Set GHL_API_TOKEN and GHL_LOCATION_ID. The contact
 *      is upserted by email so repeat submissions update rather than duplicate,
 *      and the detail is attached as a note on the contact.
 *   2. Inbound webhook. Set GHL_WEBHOOK_URL to the URL of an "Inbound Webhook"
 *      trigger in a GHL workflow. No token needed; the workflow does the rest.
 *
 * If neither is configured the lead is logged and nothing is sent, so local
 * development never silently drops a submission.
 *
 * Nothing in here is allowed to fail a visitor's submission — every path
 * catches, logs and returns.
 */

import type { Lead } from './lead'

/** Split a single name field into the first/last pair GHL expects. */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: '', lastName: '' }
  if (parts.length === 1) return { firstName: parts[0], lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

const DEFAULT_API_BASE = 'https://services.leadconnectorhq.com'

/** Overridable so the delivery path can be exercised against a mock server. */
function apiBase(): string {
  return process.env.GHL_API_BASE || DEFAULT_API_BASE
}
const DEFAULT_API_VERSION = '2021-07-28'
const TIMEOUT_MS = 8000

export interface GhlCustomField {
  /** Custom field id from GHL, or its unique key. */
  id?: string
  key?: string
  field_value: string
}

export interface GhlUpsertBody {
  locationId: string
  firstName: string
  lastName: string
  name: string
  email: string
  website?: string
  companyName?: string
  source: string
  tags: string[]
  customFields: GhlCustomField[]
}

/** Lower-case, hyphenated, safe to use as a GHL tag. */
export function toTag(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Tags are how a GHL workflow decides what happens next, so they encode where
 * the lead came from and which offer they were looking at.
 */
export function buildTags(lead: Lead): string[] {
  const tags = ['website-lead', `source-${toTag(lead.source)}`]

  if (lead.tier) tags.push(`tier-${toTag(lead.tier)}`)
  if (lead.segment) tags.push(`segment-${toTag(lead.segment)}`)
  if (lead.companySize) tags.push(`size-${toTag(lead.companySize)}`)

  // A calculator lead who has quantified a real gap is worth routing differently.
  if (lead.calculator && lead.calculator.annualGap > 0) {
    tags.push('used-pipeline-calculator')
  }

  return tags
}

/**
 * Custom field ids differ per GHL location, so the mapping is supplied as JSON
 * in GHL_CUSTOM_FIELD_MAP, e.g.
 *   {"annualGap":"abc123","meetingsNeeded":"def456"}
 * Unmapped values are left out rather than guessed at.
 */
export function buildCustomFields(
  lead: Lead,
  fieldMap: Record<string, string>
): GhlCustomField[] {
  const values: Record<string, string | undefined> = {
    companySize: lead.companySize,
    outboundApproach: lead.outboundApproach,
    tier: lead.tier,
    segment: lead.segment,
    avgDealValue: lead.calculator?.avgDealValue?.toString(),
    dealsPerMonth: lead.calculator?.dealsPerMonth?.toString(),
    targetDealsPerMonth: lead.calculator?.targetDealsPerMonth?.toString(),
    closeRatePercent: lead.calculator?.closeRatePercent?.toString(),
    monthlyGap: lead.calculator?.monthlyGap?.toString(),
    annualGap: lead.calculator?.annualGap?.toString(),
    meetingsNeeded: lead.calculator?.meetingsNeeded?.toString(),
  }

  return Object.entries(fieldMap)
    .filter(([name]) => values[name] !== undefined && values[name] !== '')
    .map(([name, id]) => ({ id, field_value: values[name] as string }))
}

export function buildUpsertBody(
  lead: Lead,
  locationId: string,
  fieldMap: Record<string, string> = {}
): GhlUpsertBody {
  const { firstName, lastName } = splitName(lead.name)

  return {
    locationId,
    firstName,
    lastName,
    name: lead.name,
    email: lead.email,
    website: lead.website,
    companyName: lead.company,
    source: `Website — ${lead.source}`,
    tags: buildTags(lead),
    customFields: buildCustomFields(lead, fieldMap),
  }
}

/** Human-readable summary attached to the contact so a rep sees the context. */
export function buildNote(lead: Lead): string {
  const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
  const lines: string[] = [`Website enquiry — ${lead.source}`, '']

  if (lead.company) lines.push(`Company: ${lead.company}`)
  if (lead.website) lines.push(`Website: ${lead.website}`)
  if (lead.companySize) lines.push(`Company size: ${lead.companySize}`)
  if (lead.outboundApproach) lines.push(`Current outbound: ${lead.outboundApproach}`)
  if (lead.tier) lines.push(`Tier of interest: ${lead.tier}`)
  if (lead.segment) lines.push(`Segment: ${lead.segment}`)

  if (lead.calculator) {
    const c = lead.calculator
    lines.push(
      '',
      'Pipeline calculator:',
      `  Average deal value: ${money(c.avgDealValue)}`,
      `  Closing now: ${c.dealsPerMonth}/mo, target ${c.targetDealsPerMonth}/mo`,
      `  Close rate: ${c.closeRatePercent}%`,
      `  Revenue gap: ${money(c.monthlyGap)}/mo, ${money(c.annualGap)}/yr`,
      `  Qualified meetings needed: ${c.meetingsNeeded}/mo`
    )
  }

  if (lead.message) lines.push('', 'Message:', lead.message)

  return lines.join('\n')
}

function parseFieldMap(raw: string | undefined): Record<string, string> {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    console.error('[ghl] GHL_CUSTOM_FIELD_MAP is not valid JSON; ignoring it')
    return {}
  }
}

async function postJson(url: string, body: unknown, headers: Record<string, string>) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
}

export interface DeliveryResult {
  /** Transports that accepted the lead. */
  delivered: string[]
  /** Transports that were configured but failed. */
  failed: string[]
}

async function sendViaApi(lead: Lead): Promise<boolean> {
  const token = process.env.GHL_API_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) return false

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: process.env.GHL_API_VERSION || DEFAULT_API_VERSION,
    Accept: 'application/json',
  }

  const body = buildUpsertBody(lead, locationId, parseFieldMap(process.env.GHL_CUSTOM_FIELD_MAP))

  const response = await postJson(`${apiBase()}/contacts/upsert`, body, headers)

  if (!response.ok) {
    console.error('[ghl] upsert failed %s: %s', response.status, await response.text())
    throw new Error(`GHL upsert responded ${response.status}`)
  }

  const result = (await response.json().catch(() => ({}))) as {
    contact?: { id?: string }
  }
  const contactId = result.contact?.id

  // The note is a convenience, not the payload — never fail the lead over it.
  if (contactId) {
    try {
      const note = await postJson(
        `${apiBase()}/contacts/${contactId}/notes`,
        { body: buildNote(lead) },
        headers
      )
      if (!note.ok) console.error('[ghl] note failed %s', note.status)
    } catch (error) {
      console.error('[ghl] note request failed', error)
    }

    await createOpportunity(contactId, lead, headers)
  }

  return true
}

/**
 * Optional: drop the lead straight into a pipeline stage. Only runs when both
 * GHL_PIPELINE_ID and GHL_PIPELINE_STAGE_ID are set.
 */
async function createOpportunity(
  contactId: string,
  lead: Lead,
  headers: Record<string, string>
) {
  const pipelineId = process.env.GHL_PIPELINE_ID
  const pipelineStageId = process.env.GHL_PIPELINE_STAGE_ID
  const locationId = process.env.GHL_LOCATION_ID
  if (!pipelineId || !pipelineStageId || !locationId) return

  try {
    const response = await postJson(
      `${apiBase()}/opportunities/`,
      {
        pipelineId,
        pipelineStageId,
        locationId,
        contactId,
        name: `${lead.company || lead.name} — ${lead.source}`,
        status: 'open',
        // The calculator gives a defensible starting value; otherwise leave it unset.
        ...(lead.calculator?.annualGap
          ? { monetaryValue: Math.round(lead.calculator.annualGap) }
          : {}),
      },
      headers
    )
    if (!response.ok) console.error('[ghl] opportunity failed %s', response.status)
  } catch (error) {
    console.error('[ghl] opportunity request failed', error)
  }
}

async function sendViaWebhook(lead: Lead, url: string, label: string): Promise<boolean> {
  const response = await postJson(
    url,
    { ...lead, tags: buildTags(lead), note: buildNote(lead) },
    process.env.CRM_WEBHOOK_SECRET
      ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` }
      : {}
  )

  if (!response.ok) {
    console.error('[%s] webhook responded %s', label, response.status)
    throw new Error(`${label} webhook responded ${response.status}`)
  }
  return true
}

/**
 * Deliver a lead to every configured destination. Failures are logged, never
 * thrown — the visitor already submitted successfully by the time this runs.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const delivered: string[] = []
  const failed: string[] = []

  const transports: { name: string; run: () => Promise<boolean> }[] = [
    { name: 'ghl-api', run: () => sendViaApi(lead) },
    {
      name: 'ghl-webhook',
      run: async () =>
        process.env.GHL_WEBHOOK_URL
          ? sendViaWebhook(lead, process.env.GHL_WEBHOOK_URL, 'ghl-webhook')
          : false,
    },
    {
      // Generic escape hatch for any non-GHL destination.
      name: 'crm-webhook',
      run: async () =>
        process.env.CRM_WEBHOOK_URL
          ? sendViaWebhook(lead, process.env.CRM_WEBHOOK_URL, 'crm-webhook')
          : false,
    },
  ]

  for (const transport of transports) {
    try {
      if (await transport.run()) delivered.push(transport.name)
    } catch (error) {
      console.error('[lead] %s failed', transport.name, error)
      failed.push(transport.name)
    }
  }

  if (delivered.length === 0 && failed.length === 0) {
    console.info('[lead] captured, no destination configured', {
      email: lead.email,
      source: lead.source,
    })
  }

  return { delivered, failed }
}
