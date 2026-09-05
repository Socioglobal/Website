import * as React from 'react'

import { Icon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/reveal'
import { LeadForm } from '@/components/LeadForm'
import { checklist } from '@/content/site'

export function ChecklistBand() {
  return (
    <section aria-labelledby="checklist-heading" className="bg-white py-16 sm:py-20">
      <div className="container">
        <Reveal>
          <div className="card mx-auto max-w-4xl border-amber/30 p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint-peach text-amber-ink sm:inline-flex">
                <Icon name="mail" />
              </span>
              <div>
                <h2 id="checklist-heading" className="text-[1.5rem] font-bold tracking-[-0.02em]">
                  {checklist.title}
                </h2>
                <p className="mt-2.5 text-body">{checklist.body}</p>
              </div>
            </div>

            <LeadForm
              className="mt-7"
              layout="inline"
              source="checklist"
              fields={['name', 'email', 'company']}
              submitLabel={checklist.button}
              successMessage="On its way. The checklist should land in your inbox within a minute."
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
