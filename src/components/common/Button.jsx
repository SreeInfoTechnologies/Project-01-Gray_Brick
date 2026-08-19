import { Link } from 'react-router-dom'

import { Icon } from './Icon'
import { cn } from '@/lib/cn'

const base =
  'gb-arrow-host group/btn inline-flex items-center justify-center gap-2.5 rounded-gb-sm font-semibold ' +
  'transition-[border-color,color,transform,box-shadow] duration-300 ease-[var(--ease-gb)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gb-gold ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-45'

const variants = {
  // Dark CTA for light surfaces; fills gold from the bottom on hover.
  primary:
    'gb-btn gb-btn--gold bg-gb-graphite text-gb-white border border-gb-graphite shadow-gb-card ' +
    'hover:border-gb-gold hover:text-gb-graphite hover:-translate-y-0.5 hover:shadow-gb-lift',
  // Gold CTA for dark surfaces: the loudest signal on the page, used sparingly.
  gold:
    'gb-btn gb-btn--light bg-gb-gold text-gb-graphite border border-gb-gold ' +
    'hover:border-gb-white hover:-translate-y-0.5 hover:shadow-gb-lift',
  // Outline for light surfaces; fills graphite.
  outline:
    'gb-btn gb-btn--dark bg-transparent text-gb-graphite border border-gb-line-light-strong ' +
    'hover:border-gb-graphite hover:text-gb-white hover:-translate-y-0.5',
  // Outline for dark surfaces; fills gold.
  outlineLight:
    'gb-btn gb-btn--gold bg-transparent text-gb-white border border-gb-line-dark-strong ' +
    'hover:border-gb-gold hover:text-gb-graphite hover:-translate-y-0.5',
  // Quiet arrow links.
  text: 'gb-textlink bg-transparent border-0 px-0 text-gb-graphite hover:text-gb-gold-dark',
  textLight: 'gb-textlink bg-transparent border-0 px-0 text-gb-white hover:text-gb-gold',
}

const sizes = {
  sm: 'h-10 px-5 text-[0.8125rem]',
  md: 'h-12 px-6 text-[0.875rem] sm:px-7',
  lg: 'h-13 px-7 text-[0.875rem] sm:h-14 sm:px-9 sm:text-[0.9375rem]',
}

const textSizes = {
  sm: 'text-[0.8125rem]',
  md: 'text-[0.875rem]',
  lg: 'text-[0.9375rem]',
}

export function Button({
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  withArrow = false,
  loading = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const isText = variant === 'text' || variant === 'textLight'

  const classes = cn(
    base,
    variants[variant],
    isText ? textSizes[size] : sizes[size],
    className,
  )

  const content = (
    <>
      {loading ? <Icon name="spinner" className="gb-spin h-4 w-4" /> : null}
      <span>{children}</span>
      {withArrow && !loading ? <Icon name="arrowRight" className="gb-arrow h-4 w-4" /> : null}
    </>
  )

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href && !disabled) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
        {...rest}
      >
        {content}
        {external ? <Icon name="arrowUpRight" className="h-3.5 w-3.5 opacity-70" /> : null}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  )
}
