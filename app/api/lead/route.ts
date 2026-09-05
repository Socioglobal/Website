import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export type LeadSource =
  | 'calculator'
  | 'checklist'
  | 'book-a-call'
  | 'tier-enquiry'

export interface LeadPayload {
  name: string
  email: string
  company?: string
  website?: string
  companySize?: string
  outboundApproach?: string
  message?: string
  source: LeadSource
  /** Populated by the calculator form so the emailed breakdown matches the screen. */
  calculator?: {
    avgDealValue: number
    dealsPerMonth: number
    targetDealsPerMonth: number
    monthlyGap: number
    annualGap: number
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function asString(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let raw: unknown

  try {
    raw = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const input = (raw ?? {}) as Record<string, unknown>

  // Honeypot: a real person never fills a visually hidden field. Accept the
  // request so bots get no signal, but do not forward it anywhere.
  if (asString(input.company_website_url)) {
    return NextResponse.json({ ok: true })
  }

  const name = asString(input.name, 120)
  const email = asString(input.email, 200).toLowerCase()

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const lead: LeadPayload = {
    name,
    email,
    company: asString(input.company, 160) || undefined,
    website: asString(input.website, 200) || undefined,
    companySize: asString(input.companySize, 80) || undefined,
    outboundApproach: asString(input.outboundApproach, 160) || undefined,
    message: asString(input.message, 4000) || undefined,
    source: (asString(input.source, 40) || 'book-a-call') as LeadSource,
    calculator:
      input.calculator && typeof input.calculator === 'object'
        ? (input.calculator as LeadPayload['calculator'])
        : undefined,
  }

  /* ------------------------------------------------------------------ *
   * CRM INTEGRATION POINT
   * ------------------------------------------------------------------
   * Everything above is validation. This is the only place that needs to
   * change to send leads onward — no component imports this file.
   *
   * Set CRM_WEBHOOK_URL in the environment (and optionally CRM_WEBHOOK_SECRET)
   * to forward each lead. Works as-is with HubSpot / Pipedrive / Zapier /
   * Make / n8n inbound webhooks, or swap the fetch for a vendor SDK call.
   *
   * Until the variable is set, leads are logged server-side only, so nothing
   * is silently dropped during development.
   * ------------------------------------------------------------------ */
  const webhookUrl = process.env.CRM_WEBHOOK_URL

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.CRM_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
      })

      if (!response.ok) {
        console.error('[lead] CRM webhook responded %s', response.status)
      }
    } catch (error) {
      // Never fail the visitor's submission because the CRM is unreachable.
      console.error('[lead] CRM webhook failed', error)
    }
  } else {
    console.info('[lead] captured (no CRM_WEBHOOK_URL set)', {
      email: lead.email,
      source: lead.source,
    })
  }

  return NextResponse.json({ ok: true })
}
