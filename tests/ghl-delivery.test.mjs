import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'

import { deliverLead } from '../lib/ghl.ts'

/** Stand-in for the GHL API, recording exactly what the delivery layer sends. */
function mockServer(handler) {
  const received = []
  const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => {
      const entry = {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: body ? JSON.parse(body) : null,
      }
      received.push(entry)
      handler(entry, res)
    })
  })
  return { server, received }
}

function listen(server) {
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address().port)))
}

const lead = {
  name: 'Jane Cooper',
  email: 'jane@company.com',
  company: 'Acme Ltd',
  website: 'acme.com',
  source: 'calculator',
  tier: 'Pipeline + Conversion',
  message: 'Pipeline dies when delivery gets busy.',
  calculator: {
    avgDealValue: 25000, dealsPerMonth: 2, targetDealsPerMonth: 5,
    closeRatePercent: 20, monthlyGap: 75000, annualGap: 900000, meetingsNeeded: 15,
  },
  submittedAt: '2026-01-01T00:00:00.000Z',
}

function clearEnv() {
  for (const k of [
    'GHL_API_TOKEN', 'GHL_LOCATION_ID', 'GHL_API_BASE', 'GHL_WEBHOOK_URL',
    'GHL_PIPELINE_ID', 'GHL_PIPELINE_STAGE_ID', 'GHL_CUSTOM_FIELD_MAP',
    'CRM_WEBHOOK_URL', 'CRM_WEBHOOK_SECRET',
  ]) delete process.env[k]
}

test('the API transport upserts the contact, then attaches a note', async (t) => {
  clearEnv()
  const { server, received } = mockServer((entry, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(entry.url.includes('upsert') ? { contact: { id: 'c_1' } } : {}))
  })
  const port = await listen(server)
  t.after(() => server.close())

  process.env.GHL_API_TOKEN = 'pit_test'
  process.env.GHL_LOCATION_ID = 'loc_1'
  process.env.GHL_API_BASE = `http://127.0.0.1:${port}`
  process.env.GHL_CUSTOM_FIELD_MAP = '{"annualGap":"f_gap"}'

  const result = await deliverLead(lead)
  assert.deepEqual(result, { delivered: ['ghl-api'], failed: [] })

  const upsert = received.find((r) => r.url === '/contacts/upsert')
  assert.ok(upsert, 'contact upsert was sent')
  assert.equal(upsert.headers.authorization, 'Bearer pit_test')
  assert.equal(upsert.headers.version, '2021-07-28')
  assert.equal(upsert.body.locationId, 'loc_1')
  assert.equal(upsert.body.firstName, 'Jane')
  assert.equal(upsert.body.email, 'jane@company.com')
  assert.ok(upsert.body.tags.includes('tier-pipeline-conversion'))
  assert.deepEqual(upsert.body.customFields, [{ id: 'f_gap', field_value: '900000' }])

  const note = received.find((r) => r.url === '/contacts/c_1/notes')
  assert.ok(note, 'note was attached to the returned contact id')
  assert.match(note.body.body, /Revenue gap: \$75,000\/mo/)
})

test('an opportunity is only opened when the pipeline is configured', async (t) => {
  clearEnv()
  const { server, received } = mockServer((entry, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(entry.url.includes('upsert') ? { contact: { id: 'c_2' } } : {}))
  })
  const port = await listen(server)
  t.after(() => server.close())

  process.env.GHL_API_TOKEN = 'pit_test'
  process.env.GHL_LOCATION_ID = 'loc_1'
  process.env.GHL_API_BASE = `http://127.0.0.1:${port}`

  await deliverLead(lead)
  assert.equal(received.filter((r) => r.url === '/opportunities/').length, 0)

  process.env.GHL_PIPELINE_ID = 'pipe_1'
  process.env.GHL_PIPELINE_STAGE_ID = 'stage_1'
  await deliverLead(lead)

  const opp = received.find((r) => r.url === '/opportunities/')
  assert.ok(opp, 'opportunity created once both ids are set')
  assert.equal(opp.body.pipelineId, 'pipe_1')
  assert.equal(opp.body.contactId, 'c_2')
  // The calculator's annual gap becomes the opportunity value.
  assert.equal(opp.body.monetaryValue, 900000)
})

test('a failing GHL API is reported, never thrown at the caller', async (t) => {
  clearEnv()
  const { server } = mockServer((_entry, res) => {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'boom' }))
  })
  const port = await listen(server)
  t.after(() => server.close())

  process.env.GHL_API_TOKEN = 'pit_test'
  process.env.GHL_LOCATION_ID = 'loc_1'
  process.env.GHL_API_BASE = `http://127.0.0.1:${port}`

  const result = await deliverLead(lead)
  assert.deepEqual(result, { delivered: [], failed: ['ghl-api'] })
})

test('the webhook transport posts the lead with tags and note', async (t) => {
  clearEnv()
  const { server, received } = mockServer((_entry, res) => {
    res.writeHead(200)
    res.end('ok')
  })
  const port = await listen(server)
  t.after(() => server.close())

  process.env.GHL_WEBHOOK_URL = `http://127.0.0.1:${port}/hook`
  process.env.CRM_WEBHOOK_SECRET = 's3cret'

  const result = await deliverLead(lead)
  assert.deepEqual(result, { delivered: ['ghl-webhook'], failed: [] })

  const hook = received[0]
  assert.equal(hook.headers.authorization, 'Bearer s3cret')
  assert.equal(hook.body.email, 'jane@company.com')
  assert.ok(Array.isArray(hook.body.tags))
  assert.match(hook.body.note, /Website enquiry — calculator/)
})

test('both transports run when both are configured', async (t) => {
  clearEnv()
  const { server, received } = mockServer((entry, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(entry.url.includes('upsert') ? { contact: { id: 'c_3' } } : {}))
  })
  const port = await listen(server)
  t.after(() => server.close())

  process.env.GHL_API_TOKEN = 'pit_test'
  process.env.GHL_LOCATION_ID = 'loc_1'
  process.env.GHL_API_BASE = `http://127.0.0.1:${port}`
  process.env.GHL_WEBHOOK_URL = `http://127.0.0.1:${port}/hook`

  const result = await deliverLead(lead)
  assert.deepEqual(result.delivered, ['ghl-api', 'ghl-webhook'])
  assert.ok(received.some((r) => r.url === '/hook'))
})

test('with nothing configured the lead is logged and no request is made', async () => {
  clearEnv()
  const result = await deliverLead(lead)
  assert.deepEqual(result, { delivered: [], failed: [] })
})
