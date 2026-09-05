import type { Metadata } from 'next'

import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Socioglobal collects, uses and stores the information you submit through this website.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
}

const sections = [
  {
    title: 'What we collect',
    body: 'Only what you type into a form on this site: your name, email address, and optionally your company, website, company size, current outbound approach and any message you write. If you use the pipeline calculator and ask for the breakdown, we also receive the figures you entered. We do not collect special category data, and we do not ask for payment details anywhere on this site.',
  },
  {
    title: 'Why we collect it',
    body: 'To reply to your enquiry, send the material you asked for, and hold a conversation about working together. That is the whole purpose. We do not sell, rent or share your details with third parties for their own marketing.',
  },
  {
    title: 'Where it goes',
    body: 'Form submissions are delivered to our email and stored in our customer relationship management system so we can keep track of the conversation. Those providers process the data on our behalf under their own security commitments.',
  },
  {
    title: 'How long we keep it',
    body: 'For as long as there is an active or plausible business conversation, and for a reasonable period afterwards for our records. Ask us to delete your information and we will, unless we are required to retain it.',
  },
  {
    title: 'Cookies and analytics',
    body: 'This site does not set advertising or tracking cookies, and it does not build a profile of you across other websites. If we later add privacy-respecting analytics to understand which pages are useful, this page will be updated before it goes live.',
  },
  {
    title: 'Your rights',
    body: 'You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted. Write to us and we will action it. If you are in Canada, this policy is intended to be consistent with PIPEDA; if you are in the EU or UK, with the GDPR.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy."
        sub="Short, because we collect very little. If anything here is unclear, email us and ask."
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
                Questions about any of this? Email{' '}
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
