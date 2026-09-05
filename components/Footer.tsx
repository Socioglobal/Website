import * as React from 'react'
import Link from 'next/link'

import { Logo } from '@/components/ui/logo'
import { footer, site } from '@/content/site'

function Column({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link
              href={link.href}
              className="text-[0.9375rem] text-body transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-white pb-28 pt-16 md:pb-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Socioglobal — home">
              <Logo />
            </Link>
            <p className="mt-5 text-[0.9375rem] text-body">{footer.description}</p>
            <p className="mt-4 text-sm text-muted">{site.location}</p>
          </div>

          <Column title="Services" links={footer.services} />
          <Column title="Company" links={footer.company} />

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] text-body transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-primary"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
                    <path d="M8 10.5v6M8 7.6v.01M12 16.5v-6M12 13a2.5 2.5 0 0 1 5 0v3.5" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/book-a-call"
                  className="text-[0.9375rem] font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  Book a revenue call
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border-soft pt-8">
          <p className="max-w-4xl text-sm leading-relaxed text-muted">
            {footer.disclaimer}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              © {year} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
