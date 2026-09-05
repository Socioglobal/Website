/**
 * Pipeline Cost Calculator — pure logic.
 *
 * Free of React and browser APIs so the arithmetic can be unit-tested on its
 * own. See /tests/calculator.test.mjs.
 *
 * Every assumption below is a stated benchmark, not a promise. The panel that
 * renders these figures shows the assumptions alongside the numbers, because a
 * calculator that hides its inputs is worth nothing to the buyer we are
 * talking to.
 */

export interface CalculatorInputs {
  /** Average value of a closed deal, in dollars. */
  avgDealValue: number
  /** Deals currently closed per month. */
  dealsPerMonth: number
  /** Deals the business wants to close per month. */
  targetDealsPerMonth: number
  /** Percentage of qualified meetings that become closed deals, 1–100. */
  closeRatePercent: number
}

export interface CalculatorResult {
  /** Shortfall in deals per month, never negative. */
  gap: number
  /** Revenue missed each month because of the gap. */
  monthlyGap: number
  /** Revenue missed across twelve months. */
  annualGap: number

  /** Qualified meetings a month required to close the gap. */
  meetingsNeeded: number
  /** Fully ramped SDRs required to produce those meetings. */
  sdrsNeeded: number
  /** Share of the gap a single fully ramped SDR could cover, 0–1. */
  singleSdrCoverage: number

  /** Fully loaded cost of one in-house SDR for a year. */
  sdrCost: number
  /** Months a typical SDR takes to reach full output. */
  sdrRampMonths: number
  /** Salary paid across the ramp period. */
  salaryDuringRamp: number
  /** Revenue still missed while the hire ramps. */
  missedDuringRamp: number
  /** Salary plus missed revenue before the hire produces at full output. */
  rampCost: number
  /** Months an outbound system takes to reach full output. */
  systemRampMonths: number
}

/** Fully loaded annual cost of one in-house SDR — salary, tax, tooling, management. */
export const SDR_COST = 75000

/** Months a typical SDR takes to reach full output. */
export const SDR_RAMP_MONTHS = 5

/** Qualified meetings one fully ramped SDR books in a month. */
export const MEETINGS_PER_SDR_PER_MONTH = 12

/**
 * A ramping SDR does not produce nothing and then everything. Output climbs
 * roughly linearly, so across the ramp they deliver about half of full output.
 * Using 0.5 rather than 0 keeps the comparison conservative and honest.
 */
export const RAMP_PRODUCTIVITY_FACTOR = 0.5

/** Months an outbound system takes to reach full output. */
export const SYSTEM_RAMP_MONTHS = 2

export const DEFAULT_INPUTS: CalculatorInputs = {
  avgDealValue: 25000,
  dealsPerMonth: 2,
  targetDealsPerMonth: 5,
  closeRatePercent: 20,
}

/** Coerce user input into a non-negative, finite number. */
export function sanitiseNumber(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return fallback
  return parsed
}

/** Clamp a value into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function calculatePipelineCost(inputs: CalculatorInputs): CalculatorResult {
  const avgDealValue = sanitiseNumber(inputs.avgDealValue)
  const dealsPerMonth = sanitiseNumber(inputs.dealsPerMonth)
  const targetDealsPerMonth = sanitiseNumber(inputs.targetDealsPerMonth)
  // A close rate of zero would divide by zero below, so the floor is 1%.
  const closeRate = clamp(sanitiseNumber(inputs.closeRatePercent, 20), 1, 100) / 100

  const gap = Math.max(0, targetDealsPerMonth - dealsPerMonth)
  const monthlyGap = gap * avgDealValue
  const annualGap = monthlyGap * 12

  // An SDR books meetings; they do not close deals. Converting the deal gap
  // into a meeting requirement is what makes the comparison below meaningful.
  const meetingsNeeded = gap === 0 ? 0 : Math.ceil(gap / closeRate)
  const sdrsNeeded =
    meetingsNeeded === 0 ? 0 : Math.ceil(meetingsNeeded / MEETINGS_PER_SDR_PER_MONTH)
  const singleSdrCoverage =
    meetingsNeeded === 0 ? 0 : Math.min(1, MEETINGS_PER_SDR_PER_MONTH / meetingsNeeded)

  const sdrCost = SDR_COST
  const sdrRampMonths = SDR_RAMP_MONTHS
  const systemRampMonths = SYSTEM_RAMP_MONTHS

  const salaryDuringRamp = sdrCost * (sdrRampMonths / 12)

  // Only the share of the gap one SDR could ever cover is counted as missed,
  // and only the half of it lost to the ramp curve.
  const missedDuringRamp =
    monthlyGap *
    singleSdrCoverage *
    sdrRampMonths *
    (1 - RAMP_PRODUCTIVITY_FACTOR)

  const rampCost = salaryDuringRamp + missedDuringRamp

  return {
    gap,
    monthlyGap,
    annualGap,
    meetingsNeeded,
    sdrsNeeded,
    singleSdrCoverage,
    sdrCost,
    sdrRampMonths,
    salaryDuringRamp,
    missedDuringRamp,
    rampCost,
    systemRampMonths,
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
