import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { site } from '@/content/site'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

/**
 * Used only by the wordmark. Inter has no condensed width, and the logotype is
 * a narrow industrial grotesque, so one extra subsetted face carries it.
 */
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-wordmark',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Socioglobal — B2B Outbound Agency & Revenue Systems',
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'B2B outbound agency',
    'outbound lead generation for MSPs',
    'fractional sales leadership',
    'cold email agency B2B tech',
    'B2B revenue agency Canada',
    'outbound lead generation Canada',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: site.url,
    siteName: site.name,
    title: 'Socioglobal — B2B Outbound Agency & Revenue Systems',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Socioglobal — B2B Outbound Agency & Revenue Systems',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  sameAs: [site.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
  },
  founder: {
    '@type': 'Person',
    name: 'Tejasvi Saini',
    jobTitle: 'Founder',
  },
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-CA',
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${site.url}/#service`,
  name: 'B2B Outbound & Revenue Systems',
  serviceType: 'B2B outbound lead generation and fractional sales leadership',
  provider: { '@id': `${site.url}/#organization` },
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'B2B technology firms, web development agencies, software development firms, Oracle and ERP implementation partners, MSPs and IT services',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engagements',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pipeline Engine',
          description:
            'Cold email infrastructure, ICP definition, verified lists, sequence copywriting and LinkedIn outreach playbooks, built and managed.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pipeline + Conversion',
          description:
            'Outbound pipeline plus CRM build, nurture automation, pipeline stages, proposal templates and booking flows.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fractional Revenue Leadership',
          description:
            'Sales process design, call coaching, hiring support, pipeline reviews and forecasting.',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </body>
    </html>
  )
}
