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
      colors: {
        white: 'var(--white)',
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        emerald: 'var(--emerald)',
        coral: 'var(--coral)',
        violet: 'var(--violet)',
        amber: 'var(--amber)',
        tint: {
          blue: 'var(--tint-blue)',
          mint: 'var(--tint-mint)',
          peach: 'var(--tint-peach)',
          violet: 'var(--tint-violet)',
        },
        border: {
          DEFAULT: 'var(--border)',
          soft: 'var(--border-soft)',
        },
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
