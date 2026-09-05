'use client'

import * as React from 'react'
import Script from 'next/script'

import { Icon } from '@/components/ui/icons'

/**
 * GoHighLevel booking widget.
 *
 * Renders the live calendar when NEXT_PUBLIC_GHL_CALENDAR_ID is set; otherwise
 * falls back to a placeholder so the page is never broken in an environment
 * without the variable. A booking made here creates the appointment and the
 * contact inside GHL directly — it does not pass through /api/lead.
 *
 * form_embed.js is GHL's own resize script: it listens for the height the
 * iframe reports and grows the frame, which is why no fixed height is set.
 */
export function GhlCalendar({ calendarId }: { calendarId?: string }) {
  if (!calendarId) {
    return (
      <div className="card mt-10 flex min-h-[420px] flex-col items-center justify-center border-dashed p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-tint-blue text-primary">
          <Icon name="calendar" className="h-7 w-7" />
        </span>
        <p className="mt-5 text-[1.0625rem] font-semibold text-ink">
          Booking calendar not connected yet
        </p>
        <p className="mt-2 max-w-md text-[0.9375rem] text-body">
          Set NEXT_PUBLIC_GHL_CALENDAR_ID to switch this panel to the live
          GoHighLevel calendar. Until then the form above reaches the same inbox
          and gets the same one-business-day reply.
        </p>
      </div>
    )
  }

  return (
    <div className="card mt-10 overflow-hidden p-2 sm:p-4">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
        title="Book a revenue call with Socioglobal"
        // The embed script sets the real height once the widget reports it.
        style={{ width: '100%', minHeight: 700, border: 'none', overflow: 'hidden' }}
        scrolling="no"
        id={`ghl-booking-${calendarId}`}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
        id="ghl-form-embed"
      />
    </div>
  )
}
