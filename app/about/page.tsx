import type { Metadata } from 'next'
import Link from 'next/link'

import { CheckMark } from '@/components/ui/icons'
import { PageHero } from '@/components/ui/page-hero'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { about, credibility, seo, site, trackRecord } from '@/content/site'
import { accents } from '@/lib/accents'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: seo.about.title,
    description: seo.about.description,
    url: `${site.url}/about`,
  },
}

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${site.url}/about` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.leadership.name,
    jobTitle: about.leadership.role,
    description: about.leadership.bio.join(' '),
    worksFor: { '@id': `${site.url}/#organization` },
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.h1}
        sub={about.opening}
      />

      {/* Credibility restated up front, since About is often the second page seen. */}
      <section aria-label="Track record at a glance" className="border-y border-border bg-white">
        <div className="container">
          <RevealGroup as="ul" className="grid grid-cols-2 gap-x-8 gap-y-9 py-11 lg:grid-cols-4">
            {credibility.map((stat) => (
              <RevealItem as="li" key={stat.label}>
                <p className="tnum text-[2rem] font-bold leading-none tracking-tight text-emerald-ink">
                  {stat.value}
                </p>
                <p className="mt-2.5 text-[0.9375rem] leading-snug text-body">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------- Approach */}
      <Section tone="canvas" aria-labelledby="approach-heading">
        <SectionHeading
          id="approach-heading"
          eyebrow="How We Think"
          title="What the agency is, in three parts."
          align="left"
          className="max-w-2xl"
        />

        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
          {about.sections.map((section) => {
            const accent = accents[section.accent]
            return (
              <RevealItem
                as="article"
                key={section.title}
                className="card card-interactive p-7 sm:p-8"
                style={{ ['--card-accent' as string]: accent.cssVar }}
              >
                <span className={cn('block h-1 w-12 rounded-full', accent.bg)} />
                <h3 className="mt-5 text-[1.25rem]">{section.title}</h3>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3.5 text-[0.9375rem] text-body">
                    {paragraph}
                  </p>
                ))}
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      {/* ----------------------------------------------------- Leadership */}
      <Section tone="violet" aria-labelledby="leadership-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{about.leadership.eyebrow}</p>
            <h2 id="leadership-heading" className="mt-4">
              {about.leadership.h2}
            </h2>
            <p className="mt-5 text-body">
              One person leads every engagement, and it is the same person who built the
              track record below.
            </p>

            {/* Headshot placeholder — swap for a next/image once a photo exists.
                Keep the alt text descriptive when you do. */}
            <div className="card mt-8 flex aspect-[4/5] max-w-[280px] items-center justify-center bg-canvas">
              <div className="px-6 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tint-violet text-xl font-bold text-violet-ink">
                  TS
                </span>
                <p className="mt-4 text-sm text-muted">Headshot placeholder</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-7 sm:p-9">
              <h3 className="text-[1.5rem]">{about.leadership.name}</h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-violet-ink">
                {about.leadership.role}
              </p>

              <div className="mt-6 space-y-4 border-t border-border-soft pt-6">
                {about.leadership.bio.map((paragraph) => (
                  <p key={paragraph} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              <ul className="mt-7 space-y-3 border-t border-border-soft pt-6">
                {trackRecord.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckMark className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-emerald-ink" />
                    <span className="text-[0.9375rem] text-body">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------ Who we serve */}
      <Section tone="white" aria-labelledby="serve-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Coverage</p>
          <h2 id="serve-heading" className="mt-4">
            B2B only. Technology only. North America.
          </h2>
          <p className="lede mt-5">
            Headquartered in Canada, working with technology firms across Canada and the
            United States. If you want the detail by segment, it is all on the{' '}
            <Link href="/who-its-for" className="font-medium text-primary hover:text-primary-dark">
              who it&rsquo;s for
            </Link>{' '}
            page, and the delivery model is on{' '}
            <Link href="/how-it-works" className="font-medium text-primary hover:text-primary-dark">
              how it works
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <ClosingCta
        title="Talk to the person who would run it."
        sub="No account manager handover, no junior team behind the logo. Book thirty minutes."
      />

      {schema.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  )
}
