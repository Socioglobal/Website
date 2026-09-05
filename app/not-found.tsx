import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArrowRight } from '@/components/ui/icons'
import { nav } from '@/content/site'

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-24 pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-40 h-[30rem] w-[30rem] rounded-full bg-primary opacity-[0.10] blur-[120px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-5">This page isn&rsquo;t here.</h1>
          <p className="lede mt-6">
            The link may be out of date. Everything on the site is one click away below.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/book-a-call">
                Book a Revenue Call
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Back to the homepage</Link>
            </Button>
          </div>

          <nav aria-label="Site" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] font-medium text-body transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
