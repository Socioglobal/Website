import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DEFAULT_INPUTS,
  SDR_COST,
  SDR_RAMP_MONTHS,
  calculatePipelineCost,
  formatCurrency,
  formatNumber,
  sanitiseNumber,
} from '../lib/calculator.ts'

test('defaults produce the documented figures', () => {
  const result = calculatePipelineCost(DEFAULT_INPUTS)

  assert.equal(result.gap, 3)
  assert.equal(result.monthlyGap, 75_000)
  assert.equal(result.annualGap, 900_000)
  assert.equal(result.sdrCost, SDR_COST)
  assert.equal(result.sdrRampMonths, SDR_RAMP_MONTHS)
  // 75000 * (5/12) + 75000 * 5
  assert.equal(result.rampCost, 406_250)
})

test('the gap never goes negative when the target is already met', () => {
  const result = calculatePipelineCost({
    avgDealValue: 25_000,
    dealsPerMonth: 8,
    targetDealsPerMonth: 5,
  })

  assert.equal(result.gap, 0)
  assert.equal(result.monthlyGap, 0)
  assert.equal(result.annualGap, 0)
  // Only the salary portion remains when there is no revenue being missed.
  assert.equal(result.rampCost, SDR_COST * (SDR_RAMP_MONTHS / 12))
})

test('opportunity cost per ramp month tracks the monthly gap', () => {
  const result = calculatePipelineCost({
    avgDealValue: 40_000,
    dealsPerMonth: 1,
    targetDealsPerMonth: 4,
  })

  assert.equal(result.monthlyGap, 120_000)
  assert.equal(result.revenuePerSdrRampMonth, result.monthlyGap)
  assert.equal(result.annualGap, 1_440_000)
})

test('negative, missing and non-numeric inputs are coerced to zero', () => {
  assert.equal(sanitiseNumber(-5), 0)
  assert.equal(sanitiseNumber('abc'), 0)
  assert.equal(sanitiseNumber(undefined), 0)
  assert.equal(sanitiseNumber(Number.NaN), 0)
  assert.equal(sanitiseNumber(Number.POSITIVE_INFINITY), 0)
  assert.equal(sanitiseNumber('12500'), 12_500)

  const result = calculatePipelineCost({
    avgDealValue: -1,
    dealsPerMonth: Number.NaN,
    targetDealsPerMonth: 3,
  })

  assert.equal(result.gap, 3)
  assert.equal(result.monthlyGap, 0)
})

test('currency and number formatting use en-US grouping', () => {
  assert.equal(formatCurrency(900_000), '$900,000')
  assert.equal(formatCurrency(406_250), '$406,250')
  assert.equal(formatCurrency(0), '$0')
  // Mid-animation values are rounded rather than shown with decimals.
  assert.equal(formatCurrency(1234.56), '$1,235')
  assert.equal(formatNumber(1_440_000), '1,440,000')
})
