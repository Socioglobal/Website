import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    // accents.ts spells out every accent utility in full — it must be scanned.
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      // Built on the "-rgb" channel variables (see globals.css) so that
      // opacity modifiers such as bg-white/90 actually compile.
      colors: {
        white: 'rgb(var(--white-rgb) / <alpha-value>)',
        canvas: 'rgb(var(--canvas-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        body: 'rgb(var(--body-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary-rgb) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark-rgb) / <alpha-value>)',
          ink: 'rgb(var(--primary-ink-rgb) / <alpha-value>)',
        },
        // Vivid accents for fills, icons and borders; the "ink" pairs are the
        // contrast-safe shades used for anything set as type.
        emerald: {
          DEFAULT: 'rgb(var(--emerald-rgb) / <alpha-value>)',
          ink: 'rgb(var(--emerald-ink-rgb) / <alpha-value>)',
        },
        coral: {
          DEFAULT: 'rgb(var(--coral-rgb) / <alpha-value>)',
          ink: 'rgb(var(--coral-ink-rgb) / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'rgb(var(--violet-rgb) / <alpha-value>)',
          ink: 'rgb(var(--violet-ink-rgb) / <alpha-value>)',
        },
        amber: {
          DEFAULT: 'rgb(var(--amber-rgb) / <alpha-value>)',
          ink: 'rgb(var(--amber-ink-rgb) / <alpha-value>)',
        },
        tint: {
          blue: 'rgb(var(--tint-blue-rgb) / <alpha-value>)',
          mint: 'rgb(var(--tint-mint-rgb) / <alpha-value>)',
          peach: 'rgb(var(--tint-peach-rgb) / <alpha-value>)',
          violet: 'rgb(var(--tint-violet-rgb) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border-rgb) / <alpha-value>)',
          soft: 'rgb(var(--border-soft-rgb) / <alpha-value>)',
        },
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        wordmark: [
          'var(--font-wordmark)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(10,14,26,0.04), 0 8px 24px rgba(10,14,26,0.04)',
        'card-hover': '0 1px 3px rgba(10,14,26,0.05), 0 12px 32px rgba(10,14,26,0.07)',
        header: '0 1px 3px rgba(10,14,26,0.04), 0 8px 24px rgba(10,14,26,0.04)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 220ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
