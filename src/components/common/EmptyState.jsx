import { Icon } from './Icon'
import { cn } from '@/lib/cn'

/**
 * Shared shape for "nothing here", "nothing matched" and "that went wrong".
 * All three stay inside the Gray Brick visual system rather than dropping to a
 * bare browser error.
 */
export function EmptyState({ icon = 'search', title, description, action, surface = 'section', className }) {
  // Sits either directly on a section or inside a card, and has to be the
  // other one of the two so its edge stays visible.
  const onCard = surface === 'card'

  return (
    <div
      className={cn(
        'gb-ticks flex flex-col items-center gap-5 border px-6 py-16 text-center sm:px-12 sm:py-20',
        onCard ? 'border-gb-line bg-gb-charcoal' : 'border-gb-line bg-gb-graphite',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-gb-sm border',
          'border-gb-line text-gb-gold',
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>

      <div className="flex flex-col gap-2">
        <p className={cn('text-lg font-semibold', 'text-gb-silver-light')}>
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              'gb-measure-tight mx-auto text-[0.9375rem] leading-relaxed',
              'text-gb-silver',
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
