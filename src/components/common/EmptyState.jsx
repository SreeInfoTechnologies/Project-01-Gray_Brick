import { Icon } from './Icon'
import { cn } from '@/lib/cn'

/**
 * Shared shape for "nothing here", "nothing matched" and "that went wrong".
 * All three stay inside the Gray Brick visual system rather than dropping to a
 * bare browser error.
 */
export function EmptyState({ icon = 'search', title, description, action, tone = 'dark', className }) {
  const onDark = tone === 'light'

  return (
    <div
      className={cn(
        'gb-ticks flex flex-col items-center gap-5 border px-6 py-16 text-center sm:px-12 sm:py-20',
        onDark ? 'border-gb-line-dark bg-gb-charcoal' : 'border-gb-line-light bg-gb-pure',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-gb-sm border',
          onDark ? 'border-gb-line-dark text-gb-gold' : 'border-gb-line-light text-gb-gold-dark',
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>

      <div className="flex flex-col gap-2">
        <p className={cn('text-lg font-semibold', onDark ? 'text-gb-white' : 'text-gb-graphite')}>
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              'gb-measure-tight mx-auto text-[0.9375rem] leading-relaxed',
              onDark ? 'text-gb-silver' : 'text-gb-concrete',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  )
}
