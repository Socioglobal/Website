import * as React from 'react'
import Link from 'next/link'

import { Icon, ArrowRight } from '@/components/ui/icons'
import { Section, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { icpSection, icps } from '@/content/site'
import { accents } from '@/lib/accents'

export function WhoWeWorkWith() {
  return (
    <Section tone="violet" aria-labelledby="icp-heading">
      <SectionHeading
        id="icp-heading"
        eyebrow={icpSection.eyebrow}
        title={icpSection.h2}
        sub={icpSection.sub}
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
        {icps.map((icp) => {
          const accent = accents[icp.accent]
          return (
            <RevealItem
              as="article"
              key={icp.slug}
              className="card card-interactive p-7"
              style={{ ['--card-accent' as string]: accent.cssVar }}
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${accent.tintBg} ${accent.text}`}
              >
                <Icon name={icp.icon} />
              </span>
              <h3 className="mt-5">{icp.name}</h3>
              <p className="mt-2.5 text-body">{icp.short}</p>
              <Link
                href={`/who-its-for#${icp.slug}`}
                className={`mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold ${accent.text} transition-opacity hover:opacity-80`}
              >
                What we build for them
                <ArrowRight />
              </Link>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
