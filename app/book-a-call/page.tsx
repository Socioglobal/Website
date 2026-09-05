import type { Metadata } from 'next'

import { CheckMark, Icon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/reveal'
import { LeadForm } from '@/components/LeadForm'
import { GhlCalendar } from '@/components/GhlCalendar'
import { bookACall, faqs, seo, site } from '@/content/site'

export const metadata: Metadata = {
  title: seo.bookACall.title,
  description: seo.bookACall.description,
  alternates: { canonical: '/book-a-call' },
  openGraph: {
    title: seo.bookACall.title,
    description: seo.bookACall.description,
    url: `${site.url}/book-a-call`,
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
      name: 'Book a Call',
      item: `${site.url}/book-a-call`,
    },
  ],
}

// The first two FAQs answer the questions people have with a form in front of
// them; repeating them here removes a reason to leave the page.
const inlineFaqs = faqs.slice(0, 2)

export default function BookACallPage({
  searchParams,
}: {
  searchParams?: { tier?: string; segment?: string }
}) {
  // Tier and segment CTAs elsewhere on the site deep-link into this page, so
  // the enquiry arrives already labelled.
  const context = {
    tier: searchParams?.tier,
    segment: searchParams?.segment,
  }
  const contextLabel = context.tier ?? context.segment

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-20 pt-32 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-40 h-[30rem] w-[30rem] rounded-full bg-primary opacity-[0.10] blur-[120px]" />
          <div className="absolute -right-28 top-0 h-[26rem] w-[26rem] rounded-full bg-violet opacity-[0.11] blur-[120px]" />
        </div>

        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* -------------------------------------------------- Left rail */}
            <Reveal>
              <p className="eyebrow">{bookACall.eyebrow}</p>
              <h1 className="mt-5">{bookACall.h1}</h1>
              <p className="lede mt-6">{bookACall.sub}</p>

              {contextLabel ? (
                <p className="mt-6 inline-flex rounded-full border border-primary bg-tint-blue px-4 py-2 text-sm font-medium text-primary">
                  Enquiring about: {contextLabel}
                </p>
              ) : null}

              <ul className="mt-9 space-y-4 border-t border-border-soft pt-8">
                {bookACall.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckMark className="mt-0.5 shrink-0 text-emerald-ink" />
                    <span className="text-body">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="card mt-9 flex items-start gap-4 bg-canvas p-5">
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tint-blue text-primary sm:inline-flex">
                  <Icon name="calendar" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.9375rem] font-semibold text-ink">
                    What happens after you send this
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] text-body">
                    We reply within one business day with two or three times. No
                    sequence, no chasing — one reply from the person who would run the
                    engagement.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ------------------------------------------------------- Form */}
            <Reveal delay={0.08}>
              <div className="card p-7 sm:p-9">
                <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
                  Tell us about your pipeline
                </h2>
                <p className="mt-2 text-[0.9375rem] text-body">
                  Two required fields. The rest simply makes the call more useful.
                </p>

                <LeadForm
                  className="mt-7"
                  source="book-a-call"
                  fields={[
                    'name',
                    'company',
                    'email',
                    'website',
                    'companySize',
                    'outboundApproach',
                    'message',
                  ]}
                  companySizes={bookACall.companySizes}
                  outboundApproaches={bookACall.outboundApproaches}
                  submitLabel="Request My Call"
                  successMessage="Got it. We will come back to you within one business day with a couple of times."
                  extraPayload={context}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Calendar embed slot */}
      <section aria-labelledby="calendar-heading" className="section bg-canvas">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow">Prefer to pick a slot yourself?</p>
              <h2 id="calendar-heading" className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)]">
                Book straight into the calendar.
              </h2>
            </div>

            {/* The live GoHighLevel calendar, or a placeholder when the id is
                not configured. Bookings made here land in GHL directly. */}
            <GhlCalendar calendarId={process.env.NEXT_PUBLIC_GHL_CALENDAR_ID} />

          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Inline FAQ */}
      <section aria-labelledby="call-faq-heading" className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl">
            <h2 id="call-faq-heading" className="text-center text-[clamp(1.75rem,3vw,2.25rem)]">
              Before you book.
            </h2>
            <dl className="mt-10 space-y-8">
              {inlineFaqs.map((faq) => (
                <div key={faq.q} className="border-l-2 border-primary pl-6">
                  <dt className="text-[1.0625rem] font-semibold text-ink">{faq.q}</dt>
                  <dd className="mt-2 text-body">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
