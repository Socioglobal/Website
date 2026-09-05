import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * The Socioglobal wordmark: spaced caps inside a thin rule box.
 * Drawn rather than shipped as an image so it stays crisp at any size and picks
 * up its colour from `currentColor` — indigo in the header, white in the footer.
 */
export function Logo({
  className,
  title = 'Socioglobal',
}: {
  className?: string
  title?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-[1.5px] border-current px-3 py-1.5 leading-none text-primary',
        className
      )}
    >
      <span className="sr-only">{title}</span>
      <span
        aria-hidden="true"
        className="text-[0.8125rem] font-bold uppercase"
        style={{ letterSpacing: '0.22em', paddingLeft: '0.22em' }}
      >
        Socioglobal
      </span>
    </span>
  )
}
