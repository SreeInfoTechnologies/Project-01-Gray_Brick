import { LOGO_MARK, LOGO_WORDMARK } from './logoPaths'
import { cn } from '@/lib/cn'

// Placement of the two groups inside each lockup. Numbers come from the
// original artwork so the stacked lockup reproduces the supplied logo exactly,
// while the horizontal one re-sets the wordmark beside the mark for use in a
// navigation bar where vertical space is the constraint.
const LOCKUPS = {
  stacked: {
    viewBox: '0 0 832 714',
    mark: 'translate(17 0)',
    wordmark: 'translate(0 554)',
  },
  horizontal: {
    viewBox: '0 0 2734 538',
    mark: 'translate(0 0)',
    wordmark: 'translate(888 91.5) scale(2.219)',
  },
  mark: {
    viewBox: LOGO_MARK.viewBox,
    mark: 'translate(0 0)',
    wordmark: null,
  },
}

/**
 * The Gray Brick logo.
 *
 * The neutral letterforms inherit `currentColor`, so the lockup reads silver on
 * graphite and graphite on paper without a second copy of the artwork; only the
 * gold column and rules are pinned, and they shift to the darker gold on light
 * surfaces to hold contrast.
 */
export function Logo({ variant = 'dark', layout = 'horizontal', className, title }) {
  const onDark = variant === 'light'
  const lockup = LOCKUPS[layout] ?? LOCKUPS.horizontal
  const labelled = Boolean(title)

  return (
    <svg
      viewBox={lockup.viewBox}
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : 'true'}
      focusable="false"
      className={cn(
        'block w-auto',
        onDark ? 'text-gb-silver-light' : 'text-gb-graphite',
        className,
      )}
    >
      {labelled ? <title>{title}</title> : null}

      <g transform={lockup.mark}>
        <g fill="currentColor" fillRule="evenodd">
          {LOGO_MARK.silver.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </g>
        <g className={onDark ? 'fill-gb-gold' : 'fill-gb-gold-dark'} fillRule="evenodd">
          {LOGO_MARK.gold.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </g>
      </g>

      {lockup.wordmark ? (
        <g transform={lockup.wordmark}>
          <g fill="currentColor" fillRule="evenodd">
            {LOGO_WORDMARK.silver.map((d) => (
              <path key={d.slice(0, 24)} d={d} />
            ))}
          </g>
          <g className={onDark ? 'fill-gb-gold' : 'fill-gb-gold-dark'} fillRule="evenodd">
            {LOGO_WORDMARK.gold.map((d) => (
              <path key={d.slice(0, 24)} d={d} />
            ))}
          </g>
        </g>
      ) : null}
    </svg>
  )
}
