import { cn } from '@/lib/cn'

/**
 * Small uppercase section label.
 *
 * With an `index` it also carries a section number, which gives a still page a
 * visible spine: the reader can see where they are in the sequence without
 * anything having to move.
 */
export function Eyebrow({ children, index, tone = 'dark', className }) {
  const onDark = tone === 'light'

  return (
    // items-start (not center) so the gold rule stays level with the first
    // line when the label wraps on a narrow screen.
    <span className={cn('inline-flex items-start gap-3', className)}>
      {index ? (
        <span
          className={cn(
            'text-eyebrow tabular-nums',
            onDark ? 'text-gb-gold' : 'text-gb-gold-dark',
          )}
        >
          {index}
        </span>
      ) : null}

      <span className="mt-[0.5em] h-px w-7 shrink-0 bg-gb-gold sm:w-9" aria-hidden="true" />

      <span className={cn('text-eyebrow uppercase', onDark ? 'text-gb-silver' : 'text-gb-industrial')}>
        {children}
      </span>
    </span>
  )
}
