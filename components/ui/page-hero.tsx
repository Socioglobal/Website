import * as React from 'react'

import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

/** Shared top-of-page block. Renders the page's single H1. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  className,
}: {
  eyebrow: string
  title: string
  sub?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-white pb-16 pt-32 sm:pb-20 sm:pt-40', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-40 h-[30rem] w-[30rem] rounded-full bg-primary opacity-[0.10] blur-[120px]" />
        <div className="absolute -right-28 -top-16 h-[26rem] w-[26rem] rounded-full bg-violet opacity-[0.11] blur-[120px]" />
      </div>

      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5">{title}</h1>
          {sub ? <p className="lede mt-6 max-w-2xl text-[1.1875rem]">{sub}</p> : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  )
}
