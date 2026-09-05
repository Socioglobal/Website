'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CountUp } from '@/components/ui/count-up'
import { LeadForm } from '@/components/LeadForm'
import { calculator as copy } from '@/content/site'
import {
  DEFAULT_INPUTS,
  calculatePipelineCost,
  formatCurrency,
  sanitiseNumber,
  type CalculatorInputs,
} from '@/lib/calculator'
import { cn } from '@/lib/utils'

type StepKey = CalculatorInputs extends Record<infer K, number> ? K : never

export function PipelineCalculator() {
  const [values, setValues] = React.useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [step, setStep] = React.useState(0)

  const results = React.useMemo(() => calculatePipelineCost(values), [values])
  const steps = copy.steps
  const current = steps[step]
  const isLastStep = step === steps.length - 1

  function update(key: StepKey, raw: string) {
    const parsed = raw === '' ? 0 : sanitiseNumber(raw, 0)
    setValues((previous) => ({ ...previous, [key]: parsed }))
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
      {/* ---------------------------------------------------------- Inputs */}
      <div className="card p-7 sm:p-9">
        <div className="flex items-center justify-between gap-4">
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
          <h3 id={`calc-q-${current.key}`} className="text-[1.375rem]">
            {current.question}
          </h3>
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
              className={cn(
                'h-14 text-xl font-semibold tnum',
                current.prefix && 'pl-9'
              )}
            />
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
            Your answers
          </p>

          <dl className="mt-4 grid grid-cols-3 gap-4">
            {steps.map((item) => (
              <div key={item.key}>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                  {item.key === 'avgDealValue'
                    ? 'Deal value'
                    : item.key === 'dealsPerMonth'
                      ? 'Now'
                      : 'Target'}
                </dt>
                <dd className="mt-1 tnum text-[0.9375rem] font-semibold text-ink">
                  {item.prefix === '$'
                    ? formatCurrency(values[item.key])
                    : `${values[item.key]}/mo`}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 rounded-lg bg-canvas px-4 py-3.5 text-sm text-body">
            Nothing here is stored until you ask for the breakdown. Change any answer
            and the figures beside it update immediately.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------- Results */}
      {/* Results are never gated — they render immediately and update live. */}
      <div className="card border-primary/25 p-7 sm:p-9">
        <p className="eyebrow">Your pipeline gap</p>

        <div className="mt-6 space-y-6" aria-live="polite">
          <div>
            <p className="text-sm font-medium text-body">{copy.results.monthly}</p>
            <p className="mt-1 text-[2.25rem] font-bold leading-none tracking-tight text-emerald">
              <CountUp value={results.monthlyGap} />
            </p>
          </div>

          <div className="rounded-lg bg-tint-mint p-5">
            <p className="text-sm font-medium text-body">{copy.results.annual}</p>
            <p className="mt-1.5 text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-emerald">
              <CountUp value={results.annualGap} />
            </p>
            {results.gap === 0 ? (
              <p className="mt-2 text-sm text-body">
                You are at or above your target. Set a higher target to see what the
                next tier of growth is worth.
              </p>
            ) : (
              <p className="mt-2 text-sm text-body">
                Based on {results.gap} missed {results.gap === 1 ? 'deal' : 'deals'} a
                month at {formatCurrency(values.avgDealValue)} each.
              </p>
            )}
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
              A typical SDR takes around {results.sdrRampMonths} months to ramp. Add{' '}
              <strong className="font-semibold text-ink">
                {formatCurrency(results.rampCost)}
              </strong>{' '}
              in salary and missed revenue during that period before the hire is
              producing at full output.
            </p>
          </div>

          <p className="rounded-lg bg-tint-blue px-5 py-4 text-[0.9375rem] font-medium text-ink">
            {copy.results.closingLine}
          </p>
        </div>

        <div className="mt-8 border-t border-border-soft pt-7">
          <h3>{copy.form.heading}</h3>
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
                monthlyGap: results.monthlyGap,
                annualGap: results.annualGap,
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
