import type { AccentName } from '@/content/site'

/**
 * Tailwind cannot see dynamically-built class names, so every accent variant is
 * written out here in full. `cssVar` is used where an inline custom property is
 * needed — card hover borders read `--card-accent`.
 */
export interface AccentStyles {
  text: string
  bg: string
  tintBg: string
  border: string
  cssVar: string
}

export const accents: Record<AccentName, AccentStyles> = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary',
    tintBg: 'bg-tint-blue',
    border: 'border-primary',
    cssVar: 'var(--primary)',
  },
  violet: {
    text: 'text-violet',
    bg: 'bg-violet',
    tintBg: 'bg-tint-violet',
    border: 'border-violet',
    cssVar: 'var(--violet)',
  },
  emerald: {
    text: 'text-emerald',
    bg: 'bg-emerald',
    tintBg: 'bg-tint-mint',
    border: 'border-emerald',
    cssVar: 'var(--emerald)',
  },
  coral: {
    text: 'text-coral',
    bg: 'bg-coral',
    tintBg: 'bg-tint-peach',
    border: 'border-coral',
    cssVar: 'var(--coral)',
  },
  amber: {
    text: 'text-amber',
    bg: 'bg-amber',
    tintBg: 'bg-tint-peach',
    border: 'border-amber',
    cssVar: 'var(--amber)',
  },
}
