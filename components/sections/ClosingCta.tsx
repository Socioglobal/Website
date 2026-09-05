import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArrowRight } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/reveal'

/** Reusable closing call to action for the inner pages. */
export function ClosingCta({
  title = 'Let’s look at your pipeline.',
  sub = 'Thirty minutes, no pitch deck. We will tell you what we would build and whether it is worth building.',
  label = 'Book a Revenue Call',
  href = '/book-a-call',
}: {
  title?: string
  sub?: string
  label?: string
  href?: string
}) {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative isolate overflow-hidden bg-primary py-20 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-24 h-[26rem] w-[26rem] rounded-full bg-violet opacity-40 blur-[120px]" />
        <div className="absolute -bottom-32 left-0 h-[22rem] w-[22rem] rounded-full bg-white opacity-[0.12] blur-[110px]" />
      </div>

      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="closing-cta-heading" className="text-white">
            {title}
          </h2>
          <p className="mt-5 text-[1.1875rem] leading-relaxed text-white/85">{sub}</p>
          <div className="mt-9 flex justify-center">
            <Button asChild size="lg" variant="white">
              <Link href={href}>
                {label}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
