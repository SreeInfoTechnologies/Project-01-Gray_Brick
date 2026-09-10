import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'
import { SectionHeading } from '@/components/common/SectionHeading'
import {
  availabilityOptions,
  directionsFor,
  labelFor,
  locationFor,
  warehouseTypes,
  warehouses,
} from '@/data/warehouses'

/**
 * The two facilities, each with its photograph, full postal address and a
 * directions link. On a site with two real buildings, showing both in full is
 * more useful than a search form that can only ever return two results.
 */
export function Facilities() {
  return (
    <section aria-labelledby="facilities-heading" className="bg-gb-charcoal py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our warehouses"
          index="02"
          title="Two facilities in north-east Bengaluru"
          lead="Both inside the city, close to the neighbourhoods our partners deliver to. One is running daily order volume; the other is finished and ready to rack."
          action={
            <Button to="/warehouses" variant="secondary" withArrow>
              All facility details
            </Button>
          }
        />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2">
          {warehouses.map((warehouse) => {
            const location = locationFor(warehouse.location)
            const directions = directionsFor(warehouse)

            return (
              <article
                key={warehouse.slug}
                className="group flex flex-col overflow-hidden rounded-gb-sm gb-card"
              >
                <Link to={`/warehouses/${warehouse.slug}`} tabIndex={-1} aria-hidden="true">
                  <ImageFrame
                    src={warehouse.image}
                    alt=""
                    ratio="3/2"
                    zoom
                    className="border-b border-gb-line"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
                    <span className="border border-gb-gold/60 px-2.5 py-1 text-gb-gold">
                      {labelFor(warehouseTypes, warehouse.type)}
                    </span>
                    <span className="border border-gb-steel px-2.5 py-1 text-gb-silver">
                      {labelFor(availabilityOptions, warehouse.availability)}
                    </span>
                  </div>

                  <h3 className="text-display-sm text-gb-silver-light">
                    <Link
                      to={`/warehouses/${warehouse.slug}`}
                      className="transition-colors duration-300 hover:text-gb-gold-soft"
                    >
                      {location?.label ?? warehouse.name}
                    </Link>
                  </h3>

                  {location?.address ? (
                    <address className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-gb-silver-light not-italic">
                      <Icon name="pin" className="mt-1 h-4 w-4 shrink-0 text-gb-gold" />
                      {location.address}
                    </address>
                  ) : null}

                  <p className="text-[0.9375rem] leading-relaxed text-gb-silver">{warehouse.summary}</p>

                  <div className="mt-auto flex flex-col gap-3 pt-3 sm:flex-row">
                    <Button to={`/warehouses/${warehouse.slug}`} variant="primary" withArrow>
                      View facility
                    </Button>
                    {directions ? (
                      <Button href={directions} variant="secondary">
                        Get directions
                      </Button>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
