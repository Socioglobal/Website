import type { Metadata } from 'next'

import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { footer, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms covering use of the Socioglobal website, its pipeline calculator and its published material.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
}

const sections = [
  {
    title: 'About this site',
    body: 'This website is published by Socioglobal, a B2B revenue agency headquartered in Canada. It exists to describe what we do and to start conversations. Using it means accepting the terms on this page.',
  },
  {
    title: 'The calculator is an estimate',
    body: 'The pipeline calculator applies stated benchmarks to figures you enter yourself. The assumptions behind it are shown alongside the results. It is a thinking tool, not financial advice, not a valuation, and not a forecast of your business. Do not make a hiring or investment decision on the strength of it alone.',
  },
  {
    title: 'No guarantee of results',
    body: footer.disclaimer,
  },
  {
    title: 'Engagements are governed separately',
    body: 'Nothing on this site is an offer, a quotation or a contract. Any work we do together is governed by a separate written agreement covering scope, fees, term and confidentiality. Where this page and that agreement differ, the agreement wins.',
  },
  {
    title: 'Our material',
    body: 'The text, design and downloadable material on this site belong to Socioglobal. Read it, quote it with attribution, and share it. Do not republish it as your own or resell it.',
  },
  {
    title: 'Liability',
    body: 'We publish this site in good faith and keep it accurate, but we do not warrant that it is error-free or continuously available. To the extent the law allows, we are not liable for indirect or consequential loss arising from your use of it.',
  },
  {
    title: 'Governing law',
    body: 'These terms are governed by the laws of Canada and the province in which Socioglobal is established.',
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service."
        sub="What this website is, what the calculator is, and what is agreed separately."
      />

      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl">
            <dl className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <dt className="text-[1.25rem] font-semibold text-ink">{section.title}</dt>
                  <dd className="mt-3 text-body">{section.body}</dd>
                </div>
              ))}
            </dl>

            <div className="card mt-12 p-6">
              <p className="text-body">
                Anything here you want clarified before we work together? Email{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
