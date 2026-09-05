import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DEFAULT_INPUTS,
  MEETINGS_PER_SDR_PER_MONTH,
  SDR_COST,
  SDR_RAMP_MONTHS,
  calculatePipelineCost,
  clamp,
  formatCurrency,
  formatNumber,
  sanitiseNumber,
} from '../lib/calculator.ts'

test('defaults produce the documented figures', () => {
  const r = calculatePipelineCost(DEFAULT_INPUTS)

  assert.equal(r.gap, 3)
  assert.equal(r.monthlyGap, 75_000)
  assert.equal(r.annualGap, 900_000)
  assert.equal(r.sdrCost, SDR_COST)
  assert.equal(r.sdrRampMonths, SDR_RAMP_MONTHS)

  // 3 deals at a 20% close rate needs 15 qualified meetings a month.
  assert.equal(r.meetingsNeeded, 15)
  // One SDR books 12, so the gap needs two of them.
  assert.equal(r.sdrsNeeded, 2)
  assert.equal(r.singleSdrCoverage, 12 / 15)

  // Salary across a 5-month ramp.
  assert.equal(r.salaryDuringRamp, 31_250)
  // 75000 * (12/15) * 5 * 0.5
  assert.equal(r.missedDuringRamp, 150_000)
  assert.equal(r.rampCost, 181_250)
})

test('one SDR can cover a small gap outright', () => {
  const r = calculatePipelineCost({
    avgDealValue: 20_000,
    dealsPerMonth: 2,
    targetDealsPerMonth: 3,
    closeRatePercent: 25,
  })

  // 1 deal at 25% needs 4 meetings, well inside one SDR's output.
  assert.equal(r.meetingsNeeded, 4)
  assert.equal(r.sdrsNeeded, 1)
  assert.equal(r.singleSdrCoverage, 1)
  // Coverage is capped at 1, so missed revenue is never inflated past the gap.
  assert.equal(r.missedDuringRamp, 20_000 * 5 * 0.5)
})

test('the gap never goes negative when the target is already met', () => {
  const r = calculatePipelineCost({
    avgDealValue: 25_000,
    dealsPerMonth: 8,
    targetDealsPerMonth: 5,
    closeRatePercent: 20,
  })

  assert.equal(r.gap, 0)
  assert.equal(r.monthlyGap, 0)
  assert.equal(r.annualGap, 0)
  assert.equal(r.meetingsNeeded, 0)
  assert.equal(r.sdrsNeeded, 0)
  assert.equal(r.missedDuringRamp, 0)
  // Only the salary portion remains when no revenue is being missed.
  assert.equal(r.rampCost, SDR_COST * (SDR_RAMP_MONTHS / 12))
})

test('a low close rate raises the meeting requirement, not the revenue gap', () => {
  const base = { avgDealValue: 30_000, dealsPerMonth: 1, targetDealsPerMonth: 4 }

  const healthy = calculatePipelineCost({ ...base, closeRatePercent: 30 })
  const poor = calculatePipelineCost({ ...base, closeRatePercent: 10 })

  assert.equal(healthy.monthlyGap, poor.monthlyGap)
  assert.equal(healthy.meetingsNeeded, 10)
  assert.equal(poor.meetingsNeeded, 30)
  assert.ok(poor.sdrsNeeded > healthy.sdrsNeeded)
})

test('close rate is clamped so it can never divide by zero', () => {
  assert.equal(clamp(0, 1, 100), 1)
  assert.equal(clamp(140, 1, 100), 100)

  const r = calculatePipelineCost({
    avgDealValue: 10_000,
    dealsPerMonth: 0,
    targetDealsPerMonth: 1,
    closeRatePercent: 0,
  })

  assert.ok(Number.isFinite(r.meetingsNeeded))
  // Falls back to the 1% floor: one deal needs a hundred meetings.
  assert.equal(r.meetingsNeeded, 100)
})

test('meetings needed always rounds up to a whole meeting', () => {
  const r = calculatePipelineCost({
    avgDealValue: 15_000,
    dealsPerMonth: 0,
    targetDealsPerMonth: 2,
    closeRatePercent: 15,
  })

  // 2 / 0.15 = 13.33, which is not a bookable number of meetings.
  assert.equal(r.meetingsNeeded, 14)
  assert.equal(r.sdrsNeeded, Math.ceil(14 / MEETINGS_PER_SDR_PER_MONTH))
})

test('negative, missing and non-numeric inputs are coerced to zero', () => {
  assert.equal(sanitiseNumber(-5), 0)
  assert.equal(sanitiseNumber('abc'), 0)
  assert.equal(sanitiseNumber(undefined), 0)
  assert.equal(sanitiseNumber(Number.NaN), 0)
  assert.equal(sanitiseNumber(Number.POSITIVE_INFINITY), 0)
  assert.equal(sanitiseNumber('12500'), 12_500)

  const r = calculatePipelineCost({
    avgDealValue: -1,
    dealsPerMonth: Number.NaN,
    targetDealsPerMonth: 3,
    closeRatePercent: 20,
  })

  assert.equal(r.gap, 3)
  assert.equal(r.monthlyGap, 0)
})

test('currency and number formatting use en-US grouping', () => {
  assert.equal(formatCurrency(900_000), '$900,000')
  assert.equal(formatCurrency(181_250), '$181,250')
  assert.equal(formatCurrency(0), '$0')
  // Mid-animation values are rounded rather than shown with decimals.
  assert.equal(formatCurrency(1234.56), '$1,235')
  assert.equal(formatNumber(1_440_000), '1,440,000')
})
