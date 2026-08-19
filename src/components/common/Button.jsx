import { Link } from 'react-router-dom'

import { Icon } from './Icon'
import { cn } from '@/lib/cn'

const base =
  'gb-arrow-host group/btn inline-flex items-center justify-center gap-2.5 rounded-gb-sm font-semibold ' +
  'transition-[border-color,color,transform,box-shadow] duration-300 ease-[var(--ease-gb)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gb-gold ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-45'

// One ground, one set of variants. The app used to carry a light and a dark
// copy of every button ("outline" vs "outlineLight"); on an all-dark site that
// second copy was just a second thing to keep in sync, so it is gone.
const variants = {
  // The loudest signal on the page: gold fill, near-black label at 6.58:1.
  // Hover warms the fill to gold-light rather than swapping to another hue.
  primary:
    'gb-btn gb-btn--gold-light bg-gb-gold text-gb-black border border-gb-gold ' +
    'hover:border-gb-gold-light hover:-translate-y-0.5 hover:shadow-gb-gold',
  // Quiet companion. Reads as a steel outline at rest; on hover gold sweeps up
  // from the bottom edge and the label flips to near-black against it.
  secondary:
    'gb-btn gb-btn--gold bg-transparent text-gb-silver-light border border-gb-steel ' +
    'hover:border-gb-gold hover:text-gb-black hover:-translate-y-0.5',
  // For the rare button sitting on gold or on a bright patch of photography,
  // where a gold-on-gold primary would disappear.
  contrast:
    'gb-btn gb-btn--gold bg-gb-black text-gb-silver-light border border-gb-black ' +
    'hover:border-gb-gold hover:text-gb-black hover:-translate-y-0.5',
  // Quiet arrow link.
  text: 'gb-textlink bg-transparent border-0 px-0 text-gb-silver-light hover:text-gb-gold',
}

// Legacy polarity-specific names still used at a few call sites map onto the
// variant that now carries that role.
const aliases = {
  gold: 'primary',
  outline: 'secondary',
  outlineLight: 'secondary',
  textLight: 'text',
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
  // Unknown variants fall through to primary rather than rendering an
  // unstyled button.
  const resolved = variants[variant] ? variant : (aliases[variant] ?? 'primary')
  const isText = resolved === 'text'

  const classes = cn(
    base,
    variants[resolved],
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
