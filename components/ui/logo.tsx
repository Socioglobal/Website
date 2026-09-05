import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * The Socioglobal wordmark: condensed caps, widely letter-spaced, inside a thin
 * rule box — a redraw of the supplied logotype.
 *
 * Drawn in markup rather than shipped as a bitmap so it stays sharp at any size
 * and takes its colour from `currentColor`: indigo on light grounds, white on
 * the primary and footer bands. Pass `className` to recolour it.
 */
export function Logo({
  className,
  title = 'Socioglobal',
  size = 'md',
}: {
  className?: string
  title?: string
  /** Header and footer use `md`; `lg` suits page-level marks. */
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: { box: 'px-2.5 py-1.5', text: 'text-[0.6875rem]', tracking: '0.26em' },
    md: { box: 'px-3.5 py-2', text: 'text-[0.875rem]', tracking: '0.28em' },
    lg: { box: 'px-5 py-3', text: 'text-[1.25rem]', tracking: '0.3em' },
  }[size]

  return (
    <span
      className={cn(
        'inline-flex items-center border-[1.5px] border-current leading-none text-primary',
        sizes.box,
        className
      )}
    >
      <span className="sr-only">{title}</span>
      <span
        aria-hidden="true"
        className={cn('font-wordmark font-medium uppercase', sizes.text)}
        // The trailing letter-space would otherwise push the word off-centre.
        style={{ letterSpacing: sizes.tracking, paddingLeft: sizes.tracking }}
      >
        Socioglobal
      </span>
    </span>
  )
}
