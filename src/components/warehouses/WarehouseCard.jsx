import { Link } from 'react-router-dom'

import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Skeleton } from '@/components/common/Skeleton'
import { ON_REQUEST, availabilityOptions, labelFor, locationFor, warehouseTypes } from '@/data/warehouses'
import { cn } from '@/lib/cn'

const availabilityTone = {
  available: 'border-gb-gold/70 text-gb-gold',
  limited: 'border-gb-steel/70 text-gb-silver',
  planned: 'border-gb-steel/50 text-gb-silver-dark',
}

export function WarehouseCard({ warehouse }) {
  const location = locationFor(warehouse.location)

  return (
    <article className="group h-full">
      <Link
        to={`/warehouses/${warehouse.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-gb-sm gb-card transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-gb)] hover:-translate-y-1.5 hover:border-gb-gold/60 hover:shadow-gb-lift focus-visible:-translate-y-1.5"
      >
        <ImageFrame
          src={warehouse.image}
          alt={warehouse.imageAlt}
          ratio="3/2"
          zoom
          className="border-b border-gb-line"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-gb-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="absolute top-4 left-4 border border-gb-gold/40 bg-gb-black/85 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.16em] text-gb-gold uppercase backdrop-blur-sm">
            {labelFor(warehouseTypes, warehouse.type)}
          </span>
        </ImageFrame>

        <div className="gb-ticks-hover relative flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-meta uppercase text-gb-silver-dark">
              <Icon name="pin" className="h-3.5 w-3.5 text-gb-gold" />
              {location?.label ?? warehouse.location}
            </span>

            <span
              className={cn(
                'border px-2 py-1 text-[0.625rem] font-semibold tracking-[0.12em] uppercase',
                availabilityTone[warehouse.availability],
              )}
            >
              {labelFor(availabilityOptions, warehouse.availability)}
            </span>
          </div>

          <h3 className="text-xl leading-snug font-bold tracking-tight text-gb-silver-light sm:text-[1.375rem]">
            {warehouse.name}
          </h3>

          {location?.corridor ? (
            <p className="text-[0.8125rem] text-gb-silver-dark">{location.corridor}</p>
          ) : null}

          <p className="text-[0.9375rem] leading-relaxed text-gb-silver">{warehouse.summary}</p>

          <dl className="mt-1 flex flex-col gap-1.5 text-[0.8125rem]">
            <div className="flex gap-2">
              <dt className="shrink-0 text-gb-silver-dark">Available area</dt>
              <dd className="text-gb-silver italic">{ON_REQUEST}</dd>
            </div>
            {warehouse.suitableFor?.length ? (
              <div className="flex gap-2">
                <dt className="shrink-0 text-gb-silver-dark">Suitable for</dt>
                <dd className="min-w-0 font-medium text-gb-silver-light">
                  {warehouse.suitableFor.join(' · ')}
                </dd>
              </div>
            ) : null}
          </dl>

          <span className="mt-auto flex items-center justify-between gap-4 border-t border-gb-line pt-4">
            <span className="text-[0.8125rem] font-semibold text-gb-silver-light transition-colors duration-300 group-hover:text-gb-gold">
              View facility
            </span>
            <span className="gb-arrow-pill relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gb-line-strong text-gb-silver-light transition-colors duration-500 group-hover:border-gb-gold">
              <Icon name="arrowRight" className="relative z-10 h-4 w-4" />
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}

/** Matches the card's proportions so the grid does not jump when data lands. */
export function WarehouseCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-gb-sm gb-card">
      <Skeleton className="aspect-[3/2] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-2 h-4 w-28" />
      </div>
    </div>
  )
}
