'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

/** Fixed bottom call-to-action bar, mobile only. */
export function MobileCtaBar() {
  const pathname = usePathname()

  // Redundant on the page it points at.
  if (pathname === '/book-a-call') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-sm leading-snug text-body">
          Ready to look at your pipeline?
        </p>
        <Button asChild size="sm" className="shrink-0">
          <Link href="/book-a-call">Book a Call</Link>
        </Button>
      </div>
    </div>
  )
}
