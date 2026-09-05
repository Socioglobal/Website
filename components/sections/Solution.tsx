import * as React from 'react'

import { Icon } from '@/components/ui/icons'
import { Section, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { solution } from '@/content/site'
import { accents } from '@/lib/accents'

export function Solution() {
  return (
    <Section tone="white" aria-labelledby="solution-heading">
      <SectionHeading
        id="solution-heading"
        eyebrow={solution.eyebrow}
        title={solution.h2}
        sub={solution.sub}
      />

      <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
        {solution.pillars.map((pillar) => {
          const accent = accents[pillar.accent]
          return (
            <RevealItem
              as="article"
              key={pillar.title}
              className="card card-interactive flex flex-col p-7"
              style={{ ['--card-accent' as string]: accent.cssVar }}
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${accent.tintBg} ${accent.text}`}
              >
                <Icon name={pillar.icon} />
              </span>

              <h3 className={`mt-5 text-[1.375rem] ${accent.text}`}>{pillar.title}</h3>
              <p className="mt-2.5 text-body">{pillar.body}</p>

              <ul className="mt-6 space-y-2.5 border-t border-border-soft pt-6">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`}
                    />
                    <span className="text-[0.9375rem] text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
