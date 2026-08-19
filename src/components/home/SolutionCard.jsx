import { Link } from 'react-router-dom'

import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'
import { cn } from '@/lib/cn'

/**
 * Solution card. The whole card is one link: a single tab stop and a single
 * hover target rather than a card with a stray "read more" inside it.
 *
 * `feature` lays the card out horizontally with the copy given more room. Used
 * for the first solution so the grid opens with a piece of hierarchy instead of
 * four identical boxes.
 */
export function SolutionCard({ solution, layout = 'stacked', className }) {
  const feature = layout === 'feature'

  return (
    <article className={cn('group relative h-full', className)}>
      <Link
        to={`/solutions#${solution.id}`}
        className={cn(
          'flex h-full overflow-hidden rounded-gb-sm border border-gb-line-light bg-gb-pure transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-gb)] hover:-translate-y-1.5 hover:border-gb-gold/60 hover:shadow-gb-lift focus-visible:-translate-y-1.5',
          feature ? 'flex-col lg:flex-row' : 'flex-col',
        )}
      >
        <ImageFrame
          src={solution.image}
          alt={solution.imageAlt}
          ratio={feature ? '3/2' : '4/3'}
          zoom
          className={cn(
            'border-gb-line-light',
            feature ? 'border-b lg:w-[58%] lg:shrink-0 lg:border-r lg:border-b-0' : 'border-b',
          )}
        >
          {/* Graphite wash that deepens on hover so the label always holds. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-gb-graphite/65 via-gb-graphite/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="absolute top-4 left-4 flex items-center gap-2 border border-gb-gold/40 bg-gb-graphite/80 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.16em] text-gb-gold uppercase backdrop-blur-sm">
            {solution.category}
          </span>

          {/* Oversized index, anchored to the image like a drawing reference. */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute right-4 bottom-3 leading-none font-bold tracking-tighter text-gb-white/25 transition-[color,transform] duration-500 ease-[var(--ease-gb)] group-hover:-translate-y-1 group-hover:text-gb-gold/70',
              feature ? 'text-[4.5rem]' : 'text-[3.25rem]',
            )}
          >
            {solution.index}
          </span>
        </ImageFrame>

        <div
          className={cn(
            'gb-ticks-hover relative flex flex-1 flex-col gap-3 p-6 sm:p-7 lg:p-8',
            feature && 'lg:justify-center lg:gap-4 lg:p-10',
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <h3
              className={cn(
                'leading-tight font-bold tracking-tight text-gb-graphite',
                feature ? 'text-display-sm' : 'text-[1.375rem]',
              )}
            >
              {solution.title}
            </h3>
            <Icon
              name={solution.icon}
              className="mt-1 hidden h-6 w-6 shrink-0 text-gb-silver transition-[color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:text-gb-gold-dark sm:block"
            />
          </div>

          <p
            className={cn(
              'leading-relaxed text-gb-industrial',
              feature ? 'text-lead' : 'text-[0.9375rem]',
            )}
          >
            {solution.summary}
          </p>

          {feature ? (
            <ul className="mt-1 flex flex-col gap-2">
              {solution.points.slice(0, 3).map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-gb-gold-dark" />
                  <span className="text-[0.875rem] leading-relaxed text-gb-concrete">{point}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <span className="mt-auto flex items-center justify-between gap-4 border-t border-gb-line-light pt-5">
            <span className="text-[0.8125rem] font-semibold text-gb-graphite transition-colors duration-300 group-hover:text-gb-gold-dark">
              Explore this solution
            </span>
            <span className="gb-arrow-pill relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gb-line-light-strong text-gb-graphite transition-colors duration-500 group-hover:border-gb-gold group-hover:text-gb-graphite">
              <Icon name="arrowRight" className="relative z-10 h-4 w-4" />
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}
