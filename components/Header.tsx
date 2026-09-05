'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'

const STICKY_AFTER = 400

export function Header() {
  const pathname = usePathname()
  const [stuck, setStuck] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > STICKY_AFTER)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'top-0 z-50 w-full transition-all duration-300',
        // The bar only becomes sticky once the visitor is 400px down the page.
        stuck
          ? 'fixed border-b border-border bg-white/90 shadow-header backdrop-blur-md'
          : 'absolute bg-transparent'
      )}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Socioglobal — home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                'text-[0.9375rem] font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-body'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/book-a-call">Book a Call</Link>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {menuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white px-6 py-5 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg py-2.5 text-base font-medium text-ink hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full">
              <Link href="/book-a-call">Book a Call</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
