import { Link, useLocation } from 'react-router-dom'

import { Icon } from './Icon'
import { JsonLd } from './StructuredData'
import { cn } from '@/lib/cn'
import { breadcrumbNode } from '@/lib/schema'

/**
 * Trail for interior pages. The current page is marked, not linked.
 *
 * The same trail is published as a BreadcrumbList, which is what search
 * engines show in place of the raw URL. Emitting it from here means a page
 * can never show one trail and declare another.
 */
export function Breadcrumbs({ items, className }) {
  const { pathname } = useLocation()

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd nodes={[breadcrumbNode(pathname, items)]} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? (
                <Icon
                  name="chevronRight"
                  className="h-3 w-3 text-gb-silver-dark"
                />
              ) : null}

              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'text-meta uppercase',
                    'text-gb-gold',
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={cn(
                    'text-meta uppercase transition-colors duration-200',
                    'text-gb-silver hover:text-gb-silver-light',
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
