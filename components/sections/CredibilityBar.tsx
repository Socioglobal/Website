import * as React from 'react'

import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { credibility } from '@/content/site'

export function CredibilityBar() {
  return (
    <section
      aria-label="Track record at a glance"
      className="border-y border-border bg-white"
    >
      <div className="container">
        <RevealGroup as="ul" className="grid grid-cols-2 gap-x-8 gap-y-9 py-11 lg:grid-cols-4">
          {credibility.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <p className="tnum text-[2rem] font-bold leading-none tracking-tight text-emerald">
                {stat.value}
              </p>
              <p className="mt-2.5 text-[0.9375rem] leading-snug text-body">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
