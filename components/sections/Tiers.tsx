import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CheckMark, ArrowRight } from '@/components/ui/icons'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { audit, tiers } from '@/content/site'
import { accents } from '@/lib/accents'
import { cn } from '@/lib/utils'

export function Tiers() {
  return (
    <Section tone="canvas" aria-labelledby="tiers-heading">
      <SectionHeading
        id="tiers-heading"
        eyebrow={tiers.eyebrow}
        title={tiers.h2}
        sub={tiers.sub}
      />

      {/* Callout strip — the low-commitment entry point above the engagements. */}
      <Reveal className="mt-12">
        <div className="card flex flex-col gap-6 border-primary/30 bg-tint-blue p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{audit.eyebrow}</p>
            <h3 className="mt-3 text-[1.5rem]">{audit.title}</h3>
            <p className="mt-2.5 text-body">{audit.body}</p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href={audit.cta.href}>
              {audit.cta.label}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>

      <RevealGroup className="mt-6 grid items-start gap-5 lg:grid-cols-3">
        {tiers.items.map((tier) => {
          const accent = accents[tier.accent]
          return (
            <RevealItem
              as="article"
              key={tier.name}
              className={cn(
                'card card-interactive flex h-full flex-col p-7',
                // The middle engagement carries a primary border.
                tier.emphasised && 'border-primary shadow-card-hover lg:-mt-3 lg:py-9'
              )}
              style={{ ['--card-accent' as string]: accent.cssVar }}
            >
              {tier.emphasised ? (
                <span className="mb-4 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                  Most common
                </span>
              ) : null}

              <h3 className="text-[1.375rem]">{tier.name}</h3>
              <p className="mt-2.5 text-[0.9375rem] text-body">{tier.premise}</p>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-border-soft py-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    For
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{tier.forWho}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    Replaces
                  </dt>
                  <dd className={cn('mt-1 text-sm font-semibold', accent.text)}>
                    {tier.replaces}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                {tier.buildLabel}
              </p>
              <ul className="mt-3.5 flex-1 space-y-3">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckMark
                      className={cn('mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0', accent.text)}
                    />
                    <span className="text-[0.9375rem] leading-snug text-body">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-border-soft pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {tier.rhythmLabel}
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-body">{tier.rhythm}</p>
                </div>
                <div className={cn('rounded-lg p-4', accent.tintBg)}>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {tier.outcomeLabel}
                  </p>
                  <p className="mt-1 text-[0.9375rem] font-medium text-ink">
                    {tier.outcome}
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant={tier.emphasised ? 'primary' : 'outline'}
                className="mt-6 w-full"
              >
                <Link href={`/book-a-call?tier=${encodeURIComponent(tier.name)}`}>
                  {tiers.cta}
                </Link>
              </Button>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Reveal className="mx-auto mt-8 max-w-3xl">
        <p className="text-center text-sm text-muted">{tiers.footnote}</p>
      </Reveal>
    </Section>
  )
}
