import * as React from 'react'

import { cn } from '@/lib/utils'

type Tone = 'white' | 'canvas' | 'blue' | 'mint' | 'peach' | 'violet' | 'primary'

const tones: Record<Tone, string> = {
  white: 'bg-white',
  canvas: 'bg-canvas',
  blue: 'bg-tint-blue',
  mint: 'bg-tint-mint',
  peach: 'bg-tint-peach',
  violet: 'bg-tint-violet',
  primary: 'bg-primary',
}

export function Section({
  tone = 'white',
  id,
  className,
  children,
  dotGrid = false,
  as: Tag = 'section',
  'aria-labelledby': labelledBy,
}: {
  tone?: Tone
  id?: string
  className?: string
  children: React.ReactNode
  dotGrid?: boolean
  as?: 'section' | 'div'
  'aria-labelledby'?: string
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn('section relative isolate', tones[tone], className)}
    >
      {dotGrid ? (
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
      ) : null}
      <div className="container">{children}</div>
    </Tag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  id,
  align = 'center',
  className,
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  sub?: string
  id?: string
  align?: 'center' | 'left'
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow ? (
        <p className={cn('eyebrow mb-4', tone === 'light' && 'text-white/75')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={cn(tone === 'light' && 'text-white')}>
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            'lede mt-5',
            tone === 'light' ? 'text-white/85' : 'text-body'
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  )
}
