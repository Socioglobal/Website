import test from 'node:test'
import assert from 'node:assert/strict'

import { parseLead } from '../lib/lead.ts'
import {
  buildCustomFields,
  buildNote,
  buildTags,
  buildUpsertBody,
  splitName,
  toTag,
} from '../lib/ghl.ts'

const baseLead = {
  name: 'Jane Cooper',
  email: 'jane@company.com',
  company: 'Acme Ltd',
  website: 'acme.com',
  source: 'book-a-call',
  submittedAt: '2026-01-01T00:00:00.000Z',
}

test('names split into the first/last pair GHL expects', () => {
  assert.deepEqual(splitName('Jane Cooper'), { firstName: 'Jane', lastName: 'Cooper' })
  assert.deepEqual(splitName('Tejasvi Saini'), { firstName: 'Tejasvi', lastName: 'Saini' })
  // Middle names and extra whitespace stay with the surname rather than vanishing.
  assert.deepEqual(splitName('  Ada  B  Lovelace '), {
    firstName: 'Ada',
    lastName: 'B Lovelace',
  })
  assert.deepEqual(splitName('Prince'), { firstName: 'Prince', lastName: '' })
  assert.deepEqual(splitName('   '), { firstName: '', lastName: '' })
})

test('tags are workflow-safe slugs', () => {
  assert.equal(toTag('Pipeline + Conversion'), 'pipeline-conversion')
  assert.equal(toTag('MSPs & IT Services'), 'msps-it-services')
  assert.equal(toTag('11–25 employees'), '11-25-employees')
})

test('tags encode source, tier, segment and size', () => {
  const tags = buildTags({
    ...baseLead,
    source: 'tier-enquiry',
    tier: 'Pipeline + Conversion',
    segment: 'MSPs & IT Services',
    companySize: '11–25 employees',
  })

  assert.deepEqual(tags, [
    'website-lead',
    'source-tier-enquiry',
    'tier-pipeline-conversion',
    'segment-msps-it-services',
    'size-11-25-employees',
  ])
})

test('the calculator tag only appears when a real gap was measured', () => {
  const zeroGap = {
    avgDealValue: 25000, dealsPerMonth: 5, targetDealsPerMonth: 5,
    closeRatePercent: 20, monthlyGap: 0, annualGap: 0, meetingsNeeded: 0,
  }
  assert.ok(!buildTags({ ...baseLead, calculator: zeroGap }).includes('used-pipeline-calculator'))
  assert.ok(
    buildTags({ ...baseLead, calculator: { ...zeroGap, annualGap: 900000 } })
      .includes('used-pipeline-calculator')
  )
})

test('only mapped custom fields are sent, and never empty ones', () => {
  const lead = {
    ...baseLead,
    companySize: '11–25 employees',
    calculator: {
      avgDealValue: 25000, dealsPerMonth: 2, targetDealsPerMonth: 5,
      closeRatePercent: 20, monthlyGap: 75000, annualGap: 900000, meetingsNeeded: 15,
    },
  }

  const fields = buildCustomFields(lead, {
    annualGap: 'field_annual',
    companySize: 'field_size',
    // Mapped but absent on this lead, so it must not be sent.
    tier: 'field_tier',
  })

  assert.deepEqual(fields, [
    { id: 'field_annual', field_value: '900000' },
    { id: 'field_size', field_value: '11–25 employees' },
  ])
})

test('an empty field map yields no custom fields', () => {
  assert.deepEqual(buildCustomFields({ ...baseLead }, {}), [])
})

test('the upsert body carries the identifiers GHL needs', () => {
  const body = buildUpsertBody({ ...baseLead }, 'loc_123')

  assert.equal(body.locationId, 'loc_123')
  assert.equal(body.firstName, 'Jane')
  assert.equal(body.lastName, 'Cooper')
  assert.equal(body.email, 'jane@company.com')
  assert.equal(body.companyName, 'Acme Ltd')
  assert.equal(body.source, 'Website — book-a-call')
  assert.ok(body.tags.includes('website-lead'))
})

test('the note carries the calculator run a rep would want on the call', () => {
  const note = buildNote({
    ...baseLead,
    source: 'calculator',
    companySize: '26–50 employees',
    message: 'Pipeline dies whenever delivery gets busy.',
    calculator: {
      avgDealValue: 25000, dealsPerMonth: 2, targetDealsPerMonth: 5,
      closeRatePercent: 20, monthlyGap: 75000, annualGap: 900000, meetingsNeeded: 15,
    },
  })

  assert.match(note, /Website enquiry — calculator/)
  assert.match(note, /Company: Acme Ltd/)
  assert.match(note, /Revenue gap: \$75,000\/mo, \$900,000\/yr/)
  assert.match(note, /Qualified meetings needed: 15\/mo/)
  assert.match(note, /Pipeline dies whenever delivery gets busy\./)
})

test('parseLead rejects bad input and accepts good input', () => {
  assert.ok(parseLead({ name: 'Jane' }).errors.email)
  assert.ok(parseLead({ email: 'jane@company.com' }).errors.name)
  assert.ok(parseLead({ name: 'Jane', email: 'nope' }).errors.email)
  assert.equal(parseLead({ company_website_url: 'spam' }).honeypot, true)

  const { lead } = parseLead({
    name: 'Jane Cooper',
    email: '  JANE@Company.com ',
    source: 'calculator',
  })
  // Emails are trimmed and lower-cased so upserts match existing contacts.
  assert.equal(lead.email, 'jane@company.com')
  assert.equal(lead.source, 'calculator')
})

test('an unrecognised source falls back rather than creating a junk tag', () => {
  const { lead } = parseLead({
    name: 'Jane Cooper',
    email: 'jane@company.com',
    source: '../../etc/passwd',
  })
  assert.equal(lead.source, 'book-a-call')
})

test('non-numeric calculator values do not reach GHL as NaN', () => {
  const { lead } = parseLead({
    name: 'Jane Cooper',
    email: 'jane@company.com',
    source: 'calculator',
    calculator: { annualGap: 'not-a-number', monthlyGap: null },
  })

  assert.equal(lead.calculator.annualGap, 0)
  assert.equal(lead.calculator.monthlyGap, 0)
  const fields = buildCustomFields(lead, { annualGap: 'f1' })
  assert.deepEqual(fields, [{ id: 'f1', field_value: '0' }])
})
