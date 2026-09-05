import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CheckMark, ArrowRight } from '@/components/ui/icons'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { hero } from '@/content/site'
import { accents } from '@/lib/accents'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-44">
      {/* Soft blurred colour orbs — primary and violet, very low opacity. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-primary opacity-[0.14] blur-[110px]" />
        <div className="absolute -right-32 top-4 h-[30rem] w-[30rem] rounded-full bg-violet opacity-[0.15] blur-[110px]" />
        <div className="absolute left-1/3 top-72 h-[24rem] w-[24rem] rounded-full bg-emerald opacity-[0.08] blur-[130px]" />
      </div>

      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5">{hero.h1}</h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="lede mt-6 max-w-2xl text-[1.25rem]">{hero.sub}</p>
          </Reveal>

          <RevealGroup as="ul" className="mt-10 space-y-4">
            {hero.bullets.map((bullet) => (
              <RevealItem as="li" key={bullet.text} className="flex items-start gap-3.5">
                <CheckMark
                  className={`mt-0.5 shrink-0 ${accents[bullet.accent].text}`}
                />
                <span className="max-w-2xl text-body">{bullet.text}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.24}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
