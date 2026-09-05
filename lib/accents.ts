import type { AccentName } from '@/content/site'

/**
 * Tailwind cannot see dynamically-built class names, so every accent variant is
 * written out here in full. `cssVar` is used where an inline custom property is
 * needed — card hover borders read `--card-accent`.
 */
export interface AccentStyles {
  /** Contrast-safe shade, for anything rendered as type. */
  text: string
  bg: string
  tintBg: string
  border: string
  cssVar: string
}

export const accents: Record<AccentName, AccentStyles> = {
  primary: {
    text: 'text-primary-ink',
    bg: 'bg-primary',
    tintBg: 'bg-tint-blue',
    border: 'border-primary',
    cssVar: 'var(--primary)',
  },
  violet: {
    text: 'text-violet-ink',
    bg: 'bg-violet',
    tintBg: 'bg-tint-violet',
    border: 'border-violet',
    cssVar: 'var(--violet)',
  },
  emerald: {
    text: 'text-emerald-ink',
    bg: 'bg-emerald',
    tintBg: 'bg-tint-mint',
    border: 'border-emerald',
    cssVar: 'var(--emerald)',
  },
  coral: {
    text: 'text-coral-ink',
    bg: 'bg-coral',
    tintBg: 'bg-tint-peach',
    border: 'border-coral',
    cssVar: 'var(--coral)',
  },
  amber: {
    text: 'text-amber-ink',
    bg: 'bg-amber',
    tintBg: 'bg-tint-peach',
    border: 'border-amber',
    cssVar: 'var(--amber)',
  },
}
