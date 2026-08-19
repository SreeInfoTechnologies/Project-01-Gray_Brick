import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { CTASection } from '@/components/common/CTASection'
import { Container } from '@/components/common/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { Icon } from '@/components/common/Icon'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Seo } from '@/components/common/Seo'
import { WarehouseCard, WarehouseCardSkeleton } from '@/components/warehouses/WarehouseCard'
import { WarehouseFilters } from '@/components/warehouses/WarehouseFilters'
import heroImage from '@/assets/images/facility-exterior-dusk.webp'
import { businessRequirements, labelFor, locations, spaceBands } from '@/data/warehouses'
import { useFilteredWarehouses } from '@/hooks/useWarehouses'

const FILTER_KEYS = ['location', 'type', 'availability']
const CARRIED_KEYS = ['space', 'requirement']

export default function Warehouses() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () =>
      FILTER_KEYS.reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) ?? '' }), {}),
    [searchParams],
  )

  const carried = useMemo(
    () => ({
      space: searchParams.get('space') ?? '',
      requirement: searchParams.get('requirement') ?? '',
    }),
    [searchParams],
  )

  const { status, results, total, retry } = useFilteredWarehouses(filters)
  const corridorCount = locations.length

  const setFilter = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams)
      if (value) next.set(key, value)
      else next.delete(key)
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  const clearFilters = useCallback(() => {
    const next = new URLSearchParams(searchParams)
    FILTER_KEYS.forEach((key) => next.delete(key))
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  const enquiryHref = useMemo(() => {
    const params = new URLSearchParams()
    ;[...FILTER_KEYS, ...CARRIED_KEYS].forEach((key) => {
      const value = searchParams.get(key)
      if (value) params.set(key, value)
    })
    const query = params.toString()
    return query ? `/contact?${query}` : '/contact'
  }, [searchParams])

  const hasCarriedCriteria = CARRIED_KEYS.some((key) => carried[key])

  return (
    <>
      <Seo
        title="Warehouses in Bengaluru"
        description="Ready-to-move, built-to-suit, fulfillment and distribution facilities across the Bengaluru corridors. Nelamangala, Hoskote, Bommasandra, Whitefield, Peenya and more."
        path="/warehouses"
      />

      <PageHero
        eyebrow="Facilities"
        title="Warehouses in and around Bengaluru"
        lead="Filter by corridor and facility type, or skip it and tell us the requirement. We will shortlist what actually fits."
        image={heroImage}
        imageAlt="Warehousing units across an industrial estate at dusk"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Warehouses' },
        ]}
        rail={[
          { icon: 'warehouse', label: `${total} facilities listed` },
          { icon: 'pin', label: `${corridorCount} Bengaluru corridors` },
          { icon: 'ruler', label: 'Specifications on evaluation' },
        ]}
      />

      <section className="bg-gb-charcoal py-14 sm:py-16 lg:py-20">
        <Container>
          <WarehouseFilters
            filters={filters}
            onChange={setFilter}
            onClear={clearFilters}
            loading={status === 'loading'}
            resultCount={results.length}
            totalCount={total}
          />

          {hasCarriedCriteria ? (
            <div className="mt-8 flex flex-col gap-4 rounded-gb-sm border border-gb-gold/40 bg-gb-graphite p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-gb-silver">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold" />
                <span>
                  Noted from your search
                  {carried.space ? (
                    <>
                      {': '}
                      <span className="font-semibold text-gb-silver-light">
                        {labelFor(spaceBands, carried.space)}
                      </span>
                    </>
                  ) : null}
                  {carried.requirement ? (
                    <>
                      {carried.space ? ' for ' : ': '}
                      <span className="font-semibold text-gb-silver-light">
                        {labelFor(businessRequirements, carried.requirement)}
                      </span>
                    </>
                  ) : null}
                  . Send it across and we will match it against what is actually available.
                </span>
              </p>

              <Button to={enquiryHref} variant="primary" size="sm" withArrow className="shrink-0">
                Request a call
              </Button>
            </div>
          ) : null}

          <div className="mt-10 lg:mt-12">
            {/* The results grid is its own region. Naming it keeps the document
                outline at h1 → h2 → h3 (card titles) and gives screen reader
                users something to jump to past the filters. */}
            <h2 className="sr-only">Facilities</h2>

            {status === 'loading' ? (
              <>
                <p className="sr-only" role="status">
                  Loading facilities
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <WarehouseCardSkeleton key={index} />
                  ))}
                </div>
              </>
            ) : null}

            {status === 'error' ? (
              <EmptyState
                icon="alert"
                title="We couldn't load the facilities right now"
                description="Please try again in a moment. If it keeps happening, send us your requirement and we will share the list directly."
                action={
                  <Button variant="primary" onClick={retry}>
                    Try again
                  </Button>
                }
              />
            ) : null}

            {status === 'ready' && total === 0 ? (
              <EmptyState
                icon="warehouse"
                title="New space is being added"
                description="Our list is being updated at the moment. Tell us what you are looking for and we will come back as facilities become available."
                action={
                  <Button to="/contact" variant="primary" withArrow>
                    Tell us what you need
                  </Button>
                }
              />
            ) : null}

            {status === 'ready' && total > 0 && results.length === 0 ? (
              <EmptyState
                icon="search"
                title="No facilities match those requirements yet"
                description="Try a nearby corridor or a different facility type. Or tell us what you need and we will look for you. A fair bit of what we place never reaches this page."
                action={
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                    <Button to="/contact" variant="primary" withArrow>
                      Talk to us
                    </Button>
                  </div>
                }
              />
            ) : null}

            {status === 'ready' && results.length > 0 ? (
              <ul className="gb-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {results.map((warehouse) => (
                  <Reveal as="li" key={warehouse.slug} className="h-full">
                    <WarehouseCard warehouse={warehouse} />
                  </Reveal>
                ))}
              </ul>
            ) : null}
          </div>

          <p className="mt-10 flex items-start gap-2 border-t border-gb-line pt-6 text-[0.8125rem] leading-relaxed text-gb-silver-dark">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold" />
            <span>
              We confirm measured specifications during site evaluation rather than publishing
              them in a listing. That covers built-up area, clear height, dock configuration and
              power. It keeps the shortlist honest.
            </span>
          </p>
        </Container>
      </section>

      <CTASection
        title="Not seeing the right fit?"
        description="Our list moves faster than any page can. Tell us the corridor, the scale and how the space will be used, and we will come back with what is available now."
        primaryLabel="Tell us what you need"
        secondaryLabel="See our solutions"
        secondaryTo="/solutions"
      />
    </>
  )
}
