import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Skeleton } from '@/components/common/Skeleton'
import { locations } from '@/data/warehouses'
import { useWarehouses } from '@/hooks/useWarehouses'

/**
 * The corridors Gray Brick works across.
 *
 * Corridor names and highways are fixed company information; the facility count
 * beside each is read from the live inventory, so this section can never claim
 * coverage the listing does not actually hold.
 */
export function CorridorBand() {
  const { status, data } = useWarehouses()

  const counts = useMemo(() => {
    const map = {}
    data.forEach((item) => {
      map[item.location] = (map[item.location] ?? 0) + 1
    })
    return map
  }, [data])

  // NOTE: no overflow clipping on this section. `overflow: hidden` here would
  // make it the scroll container for the sticky heading column, which would
  // then never stick.
  return (
    <section className="relative isolate bg-gb-graphite py-20 sm:py-24 lg:py-32">
      <div className="gb-gridlines absolute inset-0 -z-10 opacity-50" aria-hidden="true" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              tone="light"
              eyebrow="Bengaluru"
              index="05"
              title="Built around Bengaluru business"
              lead="Warehouse location matters because every extra kilometre turns into time, cost and daily complexity. These are the corridors we work across."
            />

            <Reveal variant="fade" delay={2} className="mt-8">
              <Button to="/warehouses" variant="outlineLight" withArrow>
                See every facility
              </Button>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ul className="gb-stagger border-t border-gb-line-dark">
              {locations.map((location, index) => {
                const count = counts[location.value] ?? 0
                return (
                  <Reveal as="li" key={location.value} variant="fade">
                    <Link
                      to={`/warehouses?location=${location.value}`}
                      className="group relative flex items-center gap-4 border-b border-gb-line-dark py-5 transition-colors duration-300 hover:bg-gb-charcoal/70 sm:gap-6 sm:py-6"
                    >
                      {/* Gold marker that grows out of the left edge on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute top-0 bottom-0 left-0 w-0.5 origin-top scale-y-0 bg-gb-gold transition-transform duration-500 ease-[var(--ease-gb)] group-hover:scale-y-100"
                      />

                      <span className="w-8 shrink-0 pl-1 text-[0.6875rem] font-semibold tracking-[0.18em] text-gb-concrete-light transition-colors duration-300 group-hover:text-gb-gold sm:pl-3">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-lg font-bold tracking-tight text-gb-white transition-transform duration-500 ease-[var(--ease-gb)] group-hover:translate-x-1 sm:text-xl">
                          {location.label}
                        </span>
                        <span className="mt-1 block truncate text-[0.8125rem] text-gb-concrete-light">
                          {location.corridor}
                        </span>
                      </span>

                      <span className="shrink-0 text-right">
                        {status === 'ready' ? (
                          <span className="block text-[0.8125rem] whitespace-nowrap text-gb-silver">
                            <span className="font-semibold text-gb-white">{count}</span>
                            <span className="hidden sm:inline">
                              {count === 1 ? ' facility' : ' facilities'}
                            </span>
                          </span>
                        ) : (
                          <Skeleton className="h-3.5 w-16 bg-gb-industrial/60" />
                        )}
                      </span>

                      <Icon
                        name="arrowRight"
                        className="gb-arrow h-4 w-4 shrink-0 text-gb-concrete-light transition-colors duration-300 group-hover:text-gb-gold"
                      />
                    </Link>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
