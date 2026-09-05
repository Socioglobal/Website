'use client'

import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CountUp } from '@/components/ui/count-up'
import { ArrowRight } from '@/components/ui/icons'
import { LeadForm } from '@/components/LeadForm'
import { calculator as copy } from '@/content/site'
import {
  DEFAULT_INPUTS,
  calculatePipelineCost,
  clamp,
  formatCurrency,
  formatNumber,
  sanitiseNumber,
  type CalculatorInputs,
} from '@/lib/calculator'
import { cn } from '@/lib/utils'

type StepKey = keyof CalculatorInputs

export function PipelineCalculator() {
  const [values, setValues] = React.useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [step, setStep] = React.useState(0)
  const [activePreset, setActivePreset] = React.useState<string | null>(null)

  const results = React.useMemo(() => calculatePipelineCost(values), [values])
  const steps = copy.steps
  const current = steps[step]
  const isLastStep = step === steps.length - 1

  function update(key: StepKey, raw: number | string) {
    const parsed = raw === '' ? 0 : sanitiseNumber(raw, 0)
    setActivePreset(null)
    setValues((previous) => ({ ...previous, [key]: parsed }))
  }

  function applyPreset(preset: (typeof copy.presets)[number]) {
    setActivePreset(preset.label)
    setValues({
      avgDealValue: preset.avgDealValue,
      dealsPerMonth: preset.dealsPerMonth,
      targetDealsPerMonth: preset.targetDealsPerMonth,
      closeRatePercent: preset.closeRatePercent,
    })
  }

  function formatFor(key: StepKey, value: number) {
    if (key === 'avgDealValue') return formatCurrency(value)
    if (key === 'closeRatePercent') return `${value}%`
    return `${value}/mo`
  }

  // The slider is capped for usability; the number field still accepts more.
  const sliderValue = clamp(values[current.key], current.min, current.max)

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
      {/* ---------------------------------------------------------- Inputs */}
      <div className="card p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted">
            Step {step + 1} of {steps.length}
          </p>
          <ol className="flex items-center gap-2" aria-label="Progress">
            {steps.map((item, index) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => setStep(index)}
                  aria-current={index === step ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${item.question}`}
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    index === step
                      ? 'w-8 bg-primary'
                      : index < step
                        ? 'w-4 bg-primary/45 hover:bg-primary/70'
                        : 'w-4 bg-border hover:bg-muted/60'
                  )}
                />
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7">
          <h3 className="text-[1.375rem]">{current.question}</h3>
          <p className="mt-2 text-[0.9375rem] text-body">{current.help}</p>

          <div className="relative mt-6">
            {current.prefix ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted"
              >
                {current.prefix}
              </span>
            ) : null}
            <Label htmlFor={`calc-${current.key}`} className="sr-only">
              {current.question}
            </Label>
            <Input
              id={`calc-${current.key}`}
              type="number"
              inputMode="numeric"
              min={current.min}
              max={current.max}
              step={current.step}
              value={String(values[current.key])}
              onChange={(event) => update(current.key, event.target.value)}
              className={cn('h-14 tnum text-xl font-semibold', current.prefix && 'pl-9')}
            />
          </div>

          {/* The slider is the part people actually play with. */}
          <div className="mt-5">
            <input
              type="range"
              aria-label={`${current.question} slider`}
              min={current.min}
              max={current.max}
              step={current.step}
              value={sliderValue}
              onChange={(event) => update(current.key, event.target.value)}
              className="calc-slider w-full"
            />
            <div className="mt-2 flex justify-between text-xs tnum text-muted">
              <span>{formatFor(current.key, current.min)}</span>
              <span>{formatFor(current.key, current.max)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={isLastStep}
            >
              Next
            </Button>
          </div>

          <p className="mt-8 border-t border-border-soft pt-6 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            Or start from a typical firm
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {copy.presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                aria-pressed={activePreset === preset.label}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                  activePreset === preset.label
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-surface text-body hover:border-primary hover:text-primary'
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            Your answers
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item.key}>
                <dt className="text-xs font-medium text-muted">{item.short}</dt>
                <dd>
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className="mt-1 tnum text-[0.9375rem] font-semibold text-ink transition-colors hover:text-primary"
                  >
                    {formatFor(item.key, values[item.key])}
                  </button>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* --------------------------------------------------------- Results */}
      {/* Results are never gated — they render immediately and update live. */}
      <div className="card border-primary/25 p-7 sm:p-9">
        <p className="eyebrow">Your pipeline gap</p>

        <div className="mt-6 space-y-6" aria-live="polite">
          <div>
            <p className="text-sm font-medium text-body">{copy.results.monthly}</p>
            <p className="mt-1 text-[2.25rem] font-bold leading-none tracking-tight text-emerald-ink">
              <CountUp value={results.monthlyGap} />
            </p>
          </div>

          <div className="rounded-lg bg-tint-mint p-5">
            <p className="text-sm font-medium text-body">{copy.results.annual}</p>
            <p className="mt-1.5 text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-emerald-ink">
              <CountUp value={results.annualGap} />
            </p>
            {results.gap === 0 ? (
              <p className="mt-2 text-sm text-body">
                You are at or above your target. Raise the target to see what the next
                stage of growth is worth.
              </p>
            ) : (
              <p className="mt-2 text-sm text-body">
                {results.gap} missed {results.gap === 1 ? 'deal' : 'deals'} a month at{' '}
                {formatCurrency(values.avgDealValue)} each.
              </p>
            )}
          </div>

          {/* The number that turns a revenue gap into something actionable. */}
          <div className="border-t border-border-soft pt-6">
            <p className="text-sm font-medium text-body">{copy.results.meetings}</p>
            <p className="mt-1 tnum text-[2rem] font-bold leading-none text-ink">
              {formatNumber(results.meetingsNeeded)}
              <span className="ml-2 text-base font-medium text-muted">
                qualified meetings / month
              </span>
            </p>
            {results.sdrsNeeded > 0 ? (
              <p className="mt-3 text-[0.9375rem] text-body">
                One fully ramped SDR books around 12 a month, so that gap needs{' '}
                <strong className="font-semibold text-ink">
                  {results.sdrsNeeded === 1
                    ? 'one SDR at full output'
                    : `${formatNumber(results.sdrsNeeded)} SDRs`}
                </strong>
                {results.sdrsNeeded > 1
                  ? ' — or one system that does not stop to onboard.'
                  : ' — sustained every month, without a quiet quarter.'}
              </p>
            ) : null}
          </div>

          <div className="border-t border-border-soft pt-6">
            <p className="text-sm font-medium text-body">{copy.results.sdr}</p>
            <p className="mt-1 tnum text-2xl font-bold text-ink">
              {formatCurrency(results.sdrCost)}
              <span className="ml-1.5 text-base font-medium text-muted">
                fully loaded, per year
              </span>
            </p>
            <p className="mt-3 text-[0.9375rem] text-body">
              A typical SDR takes about {results.sdrRampMonths} months to reach full
              output. Before they get there you carry{' '}
              <strong className="font-semibold text-ink">
                {formatCurrency(results.salaryDuringRamp)}
              </strong>{' '}
              in salary and{' '}
              <strong className="font-semibold text-ink">
                {formatCurrency(results.missedDuringRamp)}
              </strong>{' '}
              in revenue you were already missing —{' '}
              <strong className="font-semibold text-ink">
                {formatCurrency(results.rampCost)}
              </strong>{' '}
              before the hire is producing.
            </p>
          </div>

          <p className="rounded-lg bg-tint-blue px-5 py-4 text-[0.9375rem] font-medium text-ink">
            {copy.results.closingLine}
          </p>

          <p className="text-xs leading-relaxed text-muted">
            {copy.results.assumptions}
          </p>
        </div>

        {/* Booking is the goal; the email breakdown is the fallback. */}
        <div className="mt-8 rounded-lg border border-primary/30 bg-tint-blue p-6">
          <h3>{copy.cta.heading}</h3>
          <p className="mt-1.5 text-[0.9375rem] text-body">{copy.cta.sub}</p>
          <Button asChild size="lg" className="mt-5 w-full sm:w-auto">
            <Link href="/book-a-call">
              {copy.cta.button}
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-8 border-t border-border-soft pt-7">
          <h3 className="text-[1.125rem]">{copy.form.heading}</h3>
          <p className="mt-1.5 text-[0.9375rem] text-body">{copy.form.sub}</p>
          <LeadForm
            className="mt-5"
            source="calculator"
            fields={['name', 'email', 'company', 'website']}
            submitLabel={copy.form.button}
            successMessage="Sent. Your breakdown is on the way — we usually reply within one business day."
            extraPayload={{
              calculator: {
                avgDealValue: values.avgDealValue,
                dealsPerMonth: values.dealsPerMonth,
                targetDealsPerMonth: values.targetDealsPerMonth,
                closeRatePercent: values.closeRatePercent,
                monthlyGap: results.monthlyGap,
                annualGap: results.annualGap,
                meetingsNeeded: results.meetingsNeeded,
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
