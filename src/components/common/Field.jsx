import { Icon } from './Icon'
import { cn } from '@/lib/cn'

const controlBase =
  'w-full rounded-gb-sm border bg-gb-graphite px-4 text-[0.9375rem] text-gb-silver-light ' +
  'placeholder:text-gb-silver-dark transition-colors duration-200 ' +
  'hover:border-gb-steel focus:border-gb-gold focus:outline-2 focus:outline-offset-2 focus:outline-gb-gold ' +
  'disabled:cursor-not-allowed disabled:bg-gb-charcoal disabled:text-gb-silver-dark'

const stateClasses = (error) =>
  error ? 'border-gb-error hover:border-gb-error' : 'border-gb-line-strong'

function FieldShell({ id, label, hint, error, required, hideOptional, className, children }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-meta uppercase text-gb-silver">
        {label}
        {required ? (
          <span className="ml-1 text-gb-gold" aria-hidden="true">
            *
          </span>
        ) : null}
        {!required && !hideOptional ? (
          <span className="ml-1.5 normal-case tracking-normal text-gb-silver-dark">(optional)</span>
        ) : null}
      </label>

      {children}

      {hint && !error ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] leading-snug text-gb-silver-dark">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-gb-error"
        >
          <Icon name="alert" className="mt-0.5 h-3.5 w-3.5" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

const describedBy = (id, hint, error) => {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

export function TextField({ id, label, hint, error, required, hideOptional, className, ...rest }) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideOptional={hideOptional}
      className={className}
    >
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, stateClasses(error), 'h-12')}
        {...rest}
      />
    </FieldShell>
  )
}

export function TextAreaField({ id, label, hint, error, required, hideOptional, rows = 5, className, ...rest }) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideOptional={hideOptional}
      className={className}
    >
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, stateClasses(error), 'resize-y py-3.5 leading-relaxed')}
        {...rest}
      />
    </FieldShell>
  )
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  hideOptional,
  options,
  placeholder = 'Select an option',
  className,
  ...rest
}) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideOptional={hideOptional}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(controlBase, stateClasses(error), 'h-12 cursor-pointer appearance-none pr-11')}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gb-silver-dark"
        />
      </div>
    </FieldShell>
  )
}
