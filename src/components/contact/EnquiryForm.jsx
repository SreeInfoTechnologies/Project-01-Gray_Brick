import { useState } from 'react'

import { Button } from '@/components/common/Button'
import { SelectField, TextAreaField, TextField } from '@/components/common/Field'
import { Icon } from '@/components/common/Icon'
import { addressLines } from '@/data/company'
import { businessRequirements, locations, spaceBands } from '@/data/warehouses'
import { submitEnquiry } from '@/lib/enquiry'
import { hasErrors, validateForm } from '@/lib/validation'
import { cn } from '@/lib/cn'

const ALL_FIELDS = [
  'name',
  'company',
  'email',
  'phone',
  'requirement',
  'location',
  'space',
  'message',
]

const emptyValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  requirement: '',
  location: '',
  space: '',
  message: '',
}

/**
 * The enquiry experience, shared by the contact page and every facility page.
 *
 * Validation runs on submit and then per-field as the visitor corrects things,
 * which avoids shouting at someone who has not finished typing yet.
 */
export function EnquiryForm({ defaults = {}, facility = null, submitLabel = 'Request a call' }) {
  const [values, setValues] = useState({ ...emptyValues, ...defaults })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))

    if (submitted) {
      setErrors((current) => {
        const next = { ...current }
        const message = validateForm({ ...values, [field]: value }, [field])[field]
        if (message) next[field] = message
        else delete next[field]
        return next
      })
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)

    const nextErrors = validateForm(values, ALL_FIELDS)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      const firstField = ALL_FIELDS.find((field) => nextErrors[field])
      document.getElementById(firstField)?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitEnquiry({ ...values, facility: facility ?? undefined })
      setStatus('success')
    } catch (error) {
      console.error('[Gray Brick] Enquiry submission failed', error)
      setStatus('error')
    }
  }

  const reset = () => {
    setValues({ ...emptyValues, ...defaults })
    setErrors({})
    setSubmitted(false)
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div
        className="gb-ticks flex flex-col gap-5 rounded-gb-sm border border-gb-gold/50 bg-gb-graphite p-7 sm:p-9"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-gb-sm border border-gb-gold/60 text-gb-gold">
          <Icon name="check" className="h-5 w-5" />
        </span>

        <div className="flex flex-col gap-3">
          <h3 className="text-display-sm text-gb-silver-light">Thanks. That is with our team</h3>
          <p className="gb-measure text-[0.9375rem] leading-relaxed text-gb-silver">
            {values.name ? `${values.name.split(' ')[0]}, someone` : 'Someone'} from Gray Brick will
            read the requirement and come back to you. If it is urgent, the office is at{' '}
            {addressLines.slice(0, 2).join(', ')}.
          </p>
        </div>

        <div>
          <Button variant="outline" size="sm" onClick={reset}>
            Send another requirement
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {facility ? (
        <p className="flex items-center gap-2 rounded-gb-sm border border-gb-line bg-gb-charcoal px-4 py-3 text-[0.8125rem] text-gb-silver">
          <Icon name="warehouse" className="h-4 w-4 shrink-0 text-gb-gold" />
          <span>
            About <span className="font-semibold text-gb-silver-light">{facility}</span>
          </span>
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          required
          autoComplete="name"
          placeholder="Full name"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
        />

        <TextField
          id="company"
          label="Company"
          autoComplete="organization"
          placeholder="Business name"
          value={values.company}
          onChange={update('company')}
          error={errors.company}
        />

        <TextField
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="name@company.com"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
        />

        <TextField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 00000 00000"
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
        />

        <SelectField
          id="requirement"
          label="What is it for?"
          placeholder="Storage, fulfillment, distribution…"
          options={businessRequirements}
          value={values.requirement}
          onChange={update('requirement')}
          error={errors.requirement}
        />

        <SelectField
          id="location"
          label="Where do you need space?"
          placeholder="Any corridor"
          options={locations.map((item) => ({ value: item.value, label: item.label }))}
          value={values.location}
          onChange={update('location')}
          error={errors.location}
        />

        <SelectField
          id="space"
          label="How much space do you need?"
          placeholder="Not sure yet"
          options={spaceBands}
          value={values.space}
          onChange={update('space')}
          error={errors.space}
          className="sm:col-span-2"
        />

        <TextAreaField
          id="message"
          label="Tell us about your requirement"
          required
          rows={5}
          placeholder="What arrives, how it is stored, how it goes out, and when you need to be running. Even rough numbers help."
          value={values.message}
          onChange={update('message')}
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      {status === 'error' ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-gb-sm border border-gb-error/50 bg-gb-error/5 px-4 py-3.5 text-[0.875rem] leading-relaxed text-gb-error"
        >
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            We couldn&rsquo;t send that just now. Please try again in a moment, or visit us at{' '}
            {addressLines.slice(0, 2).join(', ')}.
          </span>
        </p>
      ) : null}

      <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between')}>
        <Button type="submit" variant="primary" size="lg" withArrow loading={status === 'submitting'}>
          {status === 'submitting' ? 'Sending' : submitLabel}
        </Button>

        <p className="text-[0.75rem] leading-relaxed text-gb-silver-dark sm:max-w-xs sm:text-right">
          We use these details only to reply to you. Fields marked * are required.
        </p>
      </div>
    </form>
  )
}
