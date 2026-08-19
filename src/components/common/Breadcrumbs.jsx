import { Link } from 'react-router-dom'

import { Icon } from './Icon'
import { cn } from '@/lib/cn'

/** Trail for interior pages. The current page is marked, not linked. */
export function Breadcrumbs({ items, tone = 'light', className }) {
  const onDark = tone === 'light'

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? (
                <Icon
                  name="chevronRight"
                  className={cn('h-3 w-3', onDark ? 'text-gb-concrete-light' : 'text-gb-silver')}
                />
              ) : null}

              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'text-meta uppercase',
                    onDark ? 'text-gb-gold' : 'text-gb-gold-dark',
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={cn(
                    'text-meta uppercase transition-colors duration-200',
                    onDark ? 'text-gb-silver hover:text-gb-white' : 'text-gb-concrete hover:text-gb-graphite',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
