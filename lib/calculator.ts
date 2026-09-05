/**
 * Pipeline Cost Calculator — pure logic.
 *
 * Everything here is deliberately free of React and browser APIs so the
 * arithmetic can be unit-tested on its own. See /tests/calculator.test.mjs.
 */

export interface CalculatorInputs {
  /** Average value of a closed deal, in dollars. */
  avgDealValue: number
  /** Deals currently closed per month. */
  dealsPerMonth: number
  /** Deals the business wants to close per month. */
  targetDealsPerMonth: number
}

export interface CalculatorResult {
  /** Shortfall in deals per month, never negative. */
  gap: number
  /** Revenue missed each month because of the gap. */
  monthlyGap: number
  /** Revenue missed across twelve months. */
  annualGap: number
  /** Fully loaded cost of one in-house SDR for a year. */
  sdrCost: number
  /** Months a typical SDR takes to reach full output. */
  sdrRampMonths: number
  /** Revenue still missed during each month of that ramp. */
  revenuePerSdrRampMonth: number
  /** Salary plus missed revenue over the ramp period. */
  rampCost: number
}

/** Fully loaded annual cost of an in-house SDR. */
export const SDR_COST = 75000

/** Months a typical SDR takes to reach full output. */
export const SDR_RAMP_MONTHS = 5

export const DEFAULT_INPUTS: CalculatorInputs = {
  avgDealValue: 25000,
  dealsPerMonth: 2,
  targetDealsPerMonth: 5,
}

/** Coerce user input into a non-negative, finite number. */
export function sanitiseNumber(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return fallback
  return parsed
}

export function calculatePipelineCost(inputs: CalculatorInputs): CalculatorResult {
  const avgDealValue = sanitiseNumber(inputs.avgDealValue)
  const dealsPerMonth = sanitiseNumber(inputs.dealsPerMonth)
  const targetDealsPerMonth = sanitiseNumber(inputs.targetDealsPerMonth)

  const gap = Math.max(0, targetDealsPerMonth - dealsPerMonth)
  const monthlyGap = gap * avgDealValue
  const annualGap = monthlyGap * 12

  const sdrCost = SDR_COST
  const sdrRampMonths = SDR_RAMP_MONTHS
  // Opportunity cost carried through every month the hire is still ramping.
  const revenuePerSdrRampMonth = monthlyGap
  const rampCost = sdrCost * (sdrRampMonths / 12) + monthlyGap * sdrRampMonths

  return {
    gap,
    monthlyGap,
    annualGap,
    sdrCost,
    sdrRampMonths,
    revenuePerSdrRampMonth,
    rampCost,
  }
}

/** Whole-dollar currency, e.g. $1,250,000. */
export function formatCurrency(value: number): string {
  return `$${Math.round(sanitiseNumber(value)).toLocaleString('en-US')}`
}

/** Plain grouped number, e.g. 1,250,000. */
export function formatNumber(value: number): string {
  return Math.round(sanitiseNumber(value)).toLocaleString('en-US')
}
