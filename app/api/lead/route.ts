import { NextResponse } from 'next/server'

import { deliverLead } from '@/lib/ghl'
import { parseLead } from '@/lib/lead'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let raw: unknown

  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const { lead, errors, honeypot } = parseLead(raw)

  // Accept silently so bots get no signal, but forward nothing.
  if (honeypot) return NextResponse.json({ ok: true })

  if (errors) return NextResponse.json({ ok: false, errors }, { status: 422 })
  if (!lead) return NextResponse.json({ ok: false, error: 'Invalid lead.' }, { status: 422 })

  // Delivery is best-effort by design: a GoHighLevel outage must never cost us
  // the enquiry, and lib/ghl.ts logs anything that fails.
  await deliverLead(lead)

  return NextResponse.json({ ok: true })
}
