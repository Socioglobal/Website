/**
 * Lead shape, validation and normalisation.
 *
 * Kept out of the route handler so it can be unit-tested and reused by the
 * delivery layer in lib/ghl.ts.
 */

export type LeadSource = 'calculator' | 'checklist' | 'book-a-call' | 'tier-enquiry'

export interface CalculatorSnapshot {
  avgDealValue: number
  dealsPerMonth: number
  targetDealsPerMonth: number
  closeRatePercent: number
  monthlyGap: number
  annualGap: number
  meetingsNeeded: number
}

export interface Lead {
  name: string
  email: string
  company?: string
  website?: string
  companySize?: string
  outboundApproach?: string
  message?: string
  /** Set when the enquiry came from a tier or segment call to action. */
  tier?: string
  segment?: string
  source: LeadSource
  /** Present when the calculator form was the origin. */
  calculator?: CalculatorSnapshot
  submittedAt: string
}

export const LEAD_SOURCES: LeadSource[] = [
  'calculator',
  'checklist',
  'book-a-call',
  'tier-enquiry',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function asString(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function asFiniteNumber(value: unknown): number | undefined {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function parseCalculator(raw: unknown): CalculatorSnapshot | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const input = raw as Record<string, unknown>

  const snapshot: CalculatorSnapshot = {
    avgDealValue: asFiniteNumber(input.avgDealValue) ?? 0,
    dealsPerMonth: asFiniteNumber(input.dealsPerMonth) ?? 0,
    targetDealsPerMonth: asFiniteNumber(input.targetDealsPerMonth) ?? 0,
    closeRatePercent: asFiniteNumber(input.closeRatePercent) ?? 0,
    monthlyGap: asFiniteNumber(input.monthlyGap) ?? 0,
    annualGap: asFiniteNumber(input.annualGap) ?? 0,
    meetingsNeeded: asFiniteNumber(input.meetingsNeeded) ?? 0,
  }

  return snapshot
}

export interface ParseResult {
  lead?: Lead
  errors?: Record<string, string>
  /** True when a bot filled the hidden field; accept quietly, forward nothing. */
  honeypot?: boolean
}

export function parseLead(raw: unknown, now: () => Date = () => new Date()): ParseResult {
  const input = (raw ?? {}) as Record<string, unknown>

  // A person never fills a visually hidden field.
  if (asString(input.company_website_url)) return { honeypot: true }

  const name = asString(input.name, 120)
  const email = asString(input.email, 200).toLowerCase()

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.'

  if (Object.keys(errors).length > 0) return { errors }

  const rawSource = asString(input.source, 40) as LeadSource
  const source: LeadSource = LEAD_SOURCES.includes(rawSource) ? rawSource : 'book-a-call'

  return {
    lead: {
      name,
      email,
      company: asString(input.company, 160) || undefined,
      website: asString(input.website, 200) || undefined,
      companySize: asString(input.companySize, 80) || undefined,
      outboundApproach: asString(input.outboundApproach, 160) || undefined,
      message: asString(input.message, 4000) || undefined,
      tier: asString(input.tier, 80) || undefined,
      segment: asString(input.segment, 80) || undefined,
      source,
      calculator: parseCalculator(input.calculator),
      submittedAt: now().toISOString(),
    },
  }
}
