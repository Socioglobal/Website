import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CheckMark, ArrowRight } from '@/components/ui/icons'
import { PageHero } from '@/components/ui/page-hero'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { howItWorks, seo, site } from '@/content/site'
import { accents } from '@/lib/accents'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: seo.howItWorks.title,
  description: seo.howItWorks.description,
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: seo.howItWorks.title,
    description: seo.howItWorks.description,
    url: `${site.url}/how-it-works`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'How It Works',
      item: `${site.url}/how-it-works`,
    },
  ],
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.h1}
        sub={howItWorks.sub}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/book-a-call">
              Book a Revenue Call
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#pipeline-calculator">Size your pipeline gap first</Link>
          </Button>
        </div>
      </PageHero>

      {/* ------------------------------------------------------- Timeline */}
      <Section tone="canvas" aria-labelledby="phases-heading">
        <SectionHeading
          id="phases-heading"
          eyebrow="The 90 Days"
          title="Three phases, each ending with something that works."
          sub="Nothing is left as a recommendation. Every phase hands over a working part of the system."
        />

        <RevealGroup className="mt-14 space-y-5">
          {howItWorks.phases.map((phase, index) => {
            const accent = accents[phase.accent]
            return (
              <RevealItem as="article" key={phase.range}>
                <div
                  className="card card-interactive grid gap-7 p-7 sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
                  style={{ ['--card-accent' as string]: accent.cssVar }}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white',
                          accent.bg
                        )}
                      >
                        {index + 1}
                      </span>
                      <p className={cn('text-sm font-semibold uppercase tracking-[0.1em]', accent.text)}>
                        {phase.range}
                      </p>
                    </div>
                    <h3 className="mt-4 text-[1.75rem] font-bold tracking-[-0.02em]">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-body">{phase.body}</p>
                  </div>

                  <ul className="space-y-3 lg:border-l lg:border-border-soft lg:pl-12">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckMark
                          className={cn('mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0', accent.text)}
                        />
                        <span className="text-[0.9375rem] text-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      {/* -------------------------------------------- What we need from you */}
      <Section tone="blue" dotGrid aria-labelledby="need-heading">
        <SectionHeading
          id="need-heading"
          eyebrow={howItWorks.needFromYou.eyebrow}
          title={howItWorks.needFromYou.h2}
          sub={howItWorks.needFromYou.sub}
        />

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
          {howItWorks.needFromYou.items.map((item) => {
            const accent = accents[item.accent]
            return (
              <RevealItem
                as="article"
                key={item.title}
                className="card card-interactive p-7"
                style={{ ['--card-accent' as string]: accent.cssVar }}
              >
                <h3 className={cn(accent.text)}>{item.title}</h3>
                <p className="mt-2.5 text-body">{item.body}</p>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-body">
            That is the whole ask. Everything else —{' '}
            <Link href="/who-its-for" className="font-medium text-primary hover:text-primary-dark">
              targeting, writing, sending, replying and reporting
            </Link>{' '}
            — sits with us.
          </p>
        </Reveal>
      </Section>

      <ClosingCta
        title="See what the first 30 days would build."
        sub="Book a call and we will map your ICP, your infrastructure gaps and your first sequences on the spot."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
