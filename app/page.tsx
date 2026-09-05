import type { Metadata } from 'next'

import { Hero } from '@/components/sections/Hero'
import { CredibilityBar } from '@/components/sections/CredibilityBar'
import { Problem } from '@/components/sections/Problem'
import { CalculatorSection } from '@/components/sections/CalculatorSection'
import { Solution } from '@/components/sections/Solution'
import { Tiers } from '@/components/sections/Tiers'
import { WhoWeWorkWith } from '@/components/sections/WhoWeWorkWith'
import { TrackRecord } from '@/components/sections/TrackRecord'
import { ChecklistBand } from '@/components/sections/ChecklistBand'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { faqs } from '@/content/site'

export const metadata: Metadata = {
  title: 'B2B Outbound Agency & Revenue Systems for Tech Firms',
  description:
    'Socioglobal builds and runs outbound pipeline systems for B2B technology firms across North America — cold email infrastructure, CRM and nurture, and fractional sales leadership.',
  alternates: { canonical: '/' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <Problem />
      <CalculatorSection />
      <Solution />
      <Tiers />
      <WhoWeWorkWith />
      <TrackRecord />
      <ChecklistBand />
      <Faq />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
