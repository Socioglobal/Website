'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckMark } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type FieldName =
  | 'name'
  | 'email'
  | 'company'
  | 'website'
  | 'companySize'
  | 'outboundApproach'
  | 'message'

export interface LeadFormProps {
  source: string
  fields: FieldName[]
  submitLabel: string
  /** Extra data merged into the POST body, e.g. calculator figures. */
  extraPayload?: Record<string, unknown>
  /** Lay the inputs out in a single row on desktop. */
  layout?: 'stacked' | 'inline'
  successMessage?: string
  className?: string
  companySizes?: readonly string[]
  outboundApproaches?: readonly string[]
  /** Renders labels and helper text for the white-on-primary CTA band. */
  tone?: 'light' | 'dark'
}

const FIELD_LABELS: Record<FieldName, string> = {
  name: 'Name',
  email: 'Work email',
  company: 'Company',
  website: 'Website',
  companySize: 'Company size',
  outboundApproach: 'Current outbound approach',
  message: 'What would you like to fix?',
}

const FIELD_PLACEHOLDERS: Partial<Record<FieldName, string>> = {
  name: 'Jane Cooper',
  email: 'jane@company.com',
  company: 'Company Inc.',
  website: 'company.com',
  message: 'A few sentences on where pipeline breaks down today.',
}

const REQUIRED: FieldName[] = ['name', 'email']

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function LeadForm({
  source,
  fields,
  submitLabel,
  extraPayload,
  layout = 'stacked',
  successMessage = 'Thanks — that is on its way. Check your inbox shortly.',
  className,
  companySizes,
  outboundApproaches,
}: LeadFormProps) {
  const [status, setStatus] = React.useState<Status>('idle')
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [formError, setFormError] = React.useState<string | null>(null)
  const formId = React.useId()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrors({})
    setFormError(null)

    const data = Object.fromEntries(new FormData(event.currentTarget).entries())

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...extraPayload, source }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setErrors(result.errors ?? {})
        setFormError(
          result.errors
            ? 'Please check the highlighted fields.'
            : 'Something went wrong. Please try again, or email us directly.'
        )
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setFormError('Could not reach the server. Please try again in a moment.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={cn(
          'flex items-start gap-3 rounded-lg border border-emerald bg-tint-mint p-5',
          className
        )}
      >
        <CheckMark className="mt-0.5 shrink-0 text-emerald" />
        <p className="text-ink">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('w-full', className)}>
      <div
        className={cn(
          'grid gap-4',
          layout === 'inline'
            ? 'sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end'
            : 'sm:grid-cols-2'
        )}
      >
        {fields.map((field) => {
          const inputId = `${formId}-${field}`
          const isFullWidth =
            layout === 'stacked' && (field === 'message' || field === 'outboundApproach')

          return (
            <div key={field} className={cn(isFullWidth && 'sm:col-span-2')}>
              <Label htmlFor={inputId}>
                {FIELD_LABELS[field]}
                {REQUIRED.includes(field) ? (
                  <span aria-hidden="true" className="ml-0.5 text-coral">
                    *
                  </span>
                ) : null}
              </Label>

              {field === 'companySize' ? (
                <Select
                  id={inputId}
                  name={field}
                  defaultValue=""
                  aria-describedby={errors[field] ? `${inputId}-error` : undefined}
                >
                  <option value="" disabled>
                    Select company size
                  </option>
                  {(companySizes ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : field === 'outboundApproach' ? (
                <Select id={inputId} name={field} defaultValue="">
                  <option value="" disabled>
                    Select what you do today
                  </option>
                  {(outboundApproaches ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : field === 'message' ? (
                <Textarea
                  id={inputId}
                  name={field}
                  placeholder={FIELD_PLACEHOLDERS[field]}
                />
              ) : (
                <Input
                  id={inputId}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  inputMode={field === 'email' ? 'email' : undefined}
                  autoComplete={
                    field === 'email'
                      ? 'email'
                      : field === 'name'
                        ? 'name'
                        : field === 'company'
                          ? 'organization'
                          : field === 'website'
                            ? 'url'
                            : undefined
                  }
                  placeholder={FIELD_PLACEHOLDERS[field]}
                  required={REQUIRED.includes(field)}
                  aria-invalid={errors[field] ? true : undefined}
                  aria-describedby={errors[field] ? `${inputId}-error` : undefined}
                />
              )}

              {errors[field] ? (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm text-coral">
                  {errors[field]}
                </p>
              ) : null}
            </div>
          )
        })}

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor={`${formId}-hp`}>Do not fill this in</label>
          <input
            id={`${formId}-hp`}
            type="text"
            name="company_website_url"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          size={layout === 'inline' ? 'md' : 'lg'}
          disabled={status === 'submitting'}
          className={cn(layout === 'stacked' && 'sm:col-span-2 sm:justify-self-start')}
        >
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </Button>
      </div>

      {formError ? (
        <p role="alert" className="mt-3 text-sm text-coral">
          {formError}
        </p>
      ) : null}

      <p className="mt-3 text-sm text-muted">
        No newsletter, no list sharing. We use this to reply to you.
      </p>
    </form>
  )
}
