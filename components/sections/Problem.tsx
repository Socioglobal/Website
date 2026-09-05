import * as React from 'react'

import { Icon } from '@/components/ui/icons'
import { Section, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { problem } from '@/content/site'
import { accents } from '@/lib/accents'

export function Problem() {
  return (
    <Section tone="peach" aria-labelledby="problem-heading">
      <SectionHeading
        id="problem-heading"
        eyebrow={problem.eyebrow}
        title={problem.h2}
        sub={problem.sub}
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
        {problem.cards.map((card) => {
          const accent = accents[card.accent]
          return (
            <RevealItem
              as="article"
              key={card.title}
              className="card card-interactive p-7"
              // Drives the accent-coloured border on hover.
              style={{ ['--card-accent' as string]: accent.cssVar }}
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${accent.tintBg} ${accent.text}`}
              >
                <Icon name={card.icon} />
              </span>
              <h3 className="mt-5">{card.title}</h3>
              <p className="mt-2.5 text-body">{card.body}</p>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
