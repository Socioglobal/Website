import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Socioglobal — outbound revenue engines for B2B tech firms'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social share card. Drawn rather than shipped as a static asset so it stays in
 * step with the brand colours, and uses only system-safe fonts so no font file
 * has to be fetched at render time.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          backgroundImage:
            'radial-gradient(circle at 12% 8%, rgba(59,91,255,0.16), transparent 45%), radial-gradient(circle at 92% 22%, rgba(124,92,255,0.16), transparent 45%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            border: '2px solid #3B5BFF',
            padding: '12px 20px',
            color: '#3B5BFF',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '0.22em',
          }}
        >
          SOCIOGLOBAL
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: '#0A0E1A',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Outbound revenue engines for B2B tech firms.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: '#4A5568',
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            We build and run the pipeline systems that turn founder-led sales into a
            repeatable revenue function.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: 22 }}>
          <span style={{ color: '#00C48C', fontWeight: 700 }}>$10M+ enterprise B2B revenue</span>
          <span style={{ color: '#E4E9F2' }}>|</span>
          <span style={{ color: '#8A94A6' }}>300+ B2B clients served</span>
          <span style={{ color: '#E4E9F2' }}>|</span>
          <span style={{ color: '#8A94A6' }}>Canada &middot; North America</span>
        </div>
      </div>
    ),
    size
  )
}
