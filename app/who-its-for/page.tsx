import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Icon, CheckMark, ArrowRight } from '@/components/ui/icons'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { icps, seo, site } from '@/content/site'
import { accents } from '@/lib/accents'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: seo.whoItsFor.title,
  description: seo.whoItsFor.description,
  alternates: { canonical: '/who-its-for' },
  openGraph: {
    title: seo.whoItsFor.title,
    description: seo.whoItsFor.description,
    url: `${site.url}/who-its-for`,
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
      name: "Who It's For",
      item: `${site.url}/who-its-for`,
    },
  ],
}

// Section grounds alternate so each segment reads as its own block.
const tones = ['white', 'canvas', 'white', 'canvas'] as const

export default function WhoItsForPage() {
  return (
    <>
      <PageHero
        eyebrow="Who It's For"
        title="Outbound built around how your segment actually buys."
        sub="We work with four kinds of B2B technology firm. The machinery is the same; the targeting, the message and the timing are not."
      >
        <nav aria-label="Segments" className="flex flex-wrap gap-2">
          {icps.map((icp) => (
            <Link
              key={icp.slug}
              href={`#${icp.slug}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
            >
              {icp.name}
            </Link>
          ))}
        </nav>
      </PageHero>

      {icps.map((icp, index) => {
        const accent = accents[icp.accent]
        const tone = tones[index % tones.length]

        return (
          <section
            key={icp.slug}
            id={icp.slug}
            aria-labelledby={`${icp.slug}-heading`}
            className={cn(
              'section scroll-mt-24',
              tone === 'white' ? 'bg-white' : 'bg-canvas'
            )}
          >
            <div className="container">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
                <Reveal>
                  <span
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-lg',
                      accent.tintBg,
                      accent.text
                    )}
                  >
                    <Icon name={icp.icon} className="h-7 w-7" />
                  </span>
                  <p className={cn('eyebrow mt-5', accent.text)}>{icp.name}</p>
                  <h2 id={`${icp.slug}-heading`} className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
                    {icp.h2}
                  </h2>
                  <p className="mt-5 text-body">{icp.problem}</p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div
                    className="card p-7 sm:p-8"
                    style={{ ['--card-accent' as string]: accent.cssVar }}
                  >
                    <h3 className="text-[1.125rem]">What we build for them</h3>
                    <ul className="mt-5 space-y-4">
                      {icp.build.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckMark
                            className={cn('mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0', accent.text)}
                          />
                          <span className="text-[0.9375rem] text-body">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 border-t border-border-soft pt-6">
                      <Button asChild className="w-full sm:w-auto">
                        <Link href={`/book-a-call?segment=${encodeURIComponent(icp.name)}`}>
                          Talk about {icp.name.replace(' & ', ' and ')}
                          <ArrowRight />
                        </Link>
                      </Button>
                      <p className="mt-3 text-sm text-muted">
                        Thirty minutes. We will tell you honestly if outbound is not your
                        constraint right now.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )
      })}

      <section aria-labelledby="not-for-heading" className="section bg-tint-peach">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Being Straight With You</p>
            <h2 id="not-for-heading" className="mt-4">
              Who this is not for.
            </h2>
            <p className="lede mt-5">
              Firms without a proven offer, businesses selling to consumers, and anyone
              who wants a contact list to run themselves. We are also the wrong fit if
              delivery cannot absorb new clients, or if nobody internally can take a
              meeting within a week of it being booked.
            </p>
            <p className="mt-5 text-body">
              If that is you today, we would rather say so on the first call than three
              months into an engagement.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta
        title="Not sure which one you are?"
        sub="Most firms sit between two of these. Book a call and we will place you properly, then build for that."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
