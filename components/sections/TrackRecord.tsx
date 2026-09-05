import * as React from 'react'

import { CheckMark } from '@/components/ui/icons'
import { Section, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { trackRecord } from '@/content/site'

/* ------------------------------------------------------------------ *
 * PLACEHOLDER: client case studies
 * ------------------------------------------------------------------
 * Named case studies go here once clients have approved being referenced.
 * Nothing is invented in the meantime — the section below states only what
 * can be substantiated.
 *
 * Suggested shape when the content exists (add to /content/site.ts):
 *
 *   export const caseStudies = [
 *     {
 *       client: 'Client name',        // written approval required
 *       segment: 'MSP',
 *       challenge: '...',
 *       built: ['...'],
 *       outcome: '...',               // only figures the client has confirmed
 *     },
 *   ] as const
 *
 * Then render them as a <CaseStudies /> section directly beneath this one.
 * ------------------------------------------------------------------ */

export function TrackRecord() {
  return (
    <Section tone="mint" dotGrid aria-labelledby="track-record-heading">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <SectionHeading
          id="track-record-heading"
          eyebrow={trackRecord.eyebrow}
          title={trackRecord.h2}
          sub={trackRecord.sub}
          align="left"
        />

        <RevealGroup as="ul" className="space-y-4">
          {trackRecord.points.map((point) => (
            <RevealItem as="li" key={point}>
              <div className="card flex items-start gap-4 p-5 sm:p-6">
                <CheckMark className="mt-0.5 shrink-0 text-emerald-ink" />
                <p className="text-ink">{point}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
