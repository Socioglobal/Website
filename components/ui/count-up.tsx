'use client'

import * as React from 'react'
import { useReducedMotion } from 'framer-motion'

import { formatCurrency, formatNumber } from '@/lib/calculator'

const DURATION = 650

/**
 * Animates from the previously rendered value to the current one whenever
 * `value` changes. Falls back to the plain formatted number when the visitor
 * has asked for reduced motion.
 */
export function CountUp({
  value,
  className,
  currency = true,
}: {
  value: number
  className?: string
  currency?: boolean
}) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = React.useState(value)
  const fromRef = React.useRef(value)
  const frameRef = React.useRef<number>()

  React.useEffect(() => {
    if (reduced) {
      fromRef.current = value
      setDisplay(value)
      return
    }

    const from = fromRef.current
    const delta = value - from
    if (delta === 0) return

    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + delta * eased)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = value
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      fromRef.current = value
    }
  }, [value, reduced])

  const format = currency ? formatCurrency : formatNumber

  return (
    <span className={className}>
      {/* The live figure is announced only once it settles. */}
      <span aria-hidden="true" className="tnum">
        {format(display)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  )
}
