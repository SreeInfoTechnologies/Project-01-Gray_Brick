import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { CTASection } from '@/components/common/CTASection'
import { Container } from '@/components/common/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Icon } from '@/components/common/Icon'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Seo } from '@/components/common/Seo'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { WarehouseCard } from '@/components/warehouses/WarehouseCard'
import { WarehouseDetailSkeleton } from '@/components/warehouses/WarehouseDetailSkeleton'
import { WarehouseGallery } from '@/components/warehouses/WarehouseGallery'
import { WarehouseSpecs } from '@/components/warehouses/WarehouseSpecs'
import {
  availabilityOptions,
  labelFor,
  locationFor,
  relatedWarehouses,
  warehouseTypes,
} from '@/data/warehouses'
import { useWarehouses } from '@/hooks/useWarehouses'

function NotAvailable() {
  return (
    <>
      <Seo
        title="Facility not found"
        description="The facility you are looking for is no longer listed. Browse the current Gray Brick Infra warehousing inventory."
        path="/warehouses"
      />
      <div className="bg-gb-graphite pt-32 pb-20 lg:pt-44 lg:pb-28">
        <Container size="narrow">
          <EmptyState
            tone="light"
            icon="warehouse"
            title="That facility is no longer listed"
            description="It may have been taken up, or the link may be out of date. The current list is on the warehouses page. Or tell us what you need and we will look for you."
            action={
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button to="/warehouses" variant="gold" withArrow>
                  Browse warehouses
                </Button>
                <Button to="/contact" variant="outlineLight">
                  Tell us what you need
                </Button>
              </div>
            }
          />
        </Container>
      </div>
    </>
  )
}

function LoadFailed({ onRetry }) {
  return (
    <div className="bg-gb-graphite pt-32 pb-20 lg:pt-44 lg:pb-28">
      <Container size="narrow">
        <EmptyState
          tone="light"
          icon="alert"
          title="We couldn't load this facility right now"
          description="Please try again in a moment. Or send us your requirement and we will share the details directly."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="gold" onClick={onRetry}>
                Try again
              </Button>
              <Button to="/warehouses" variant="outlineLight">
                Browse warehouses
              </Button>
            </div>
          }
        />
      </Container>
    </div>
  )
}

export default function WarehouseDetail() {
  const { slug } = useParams()
  // Same data path as the listing, so swapping in an API changes nothing here.
  const { status, data, retry } = useWarehouses()
  const warehouse = useMemo(() => data.find((item) => item.slug === slug), [data, slug])

  if (status === 'loading') return <WarehouseDetailSkeleton />
  if (status === 'error') return <LoadFailed onRetry={retry} />
  if (!warehouse) return <NotAvailable />

  const location = locationFor(warehouse.location)
  const typeLabel = labelFor(warehouseTypes, warehouse.type)
  const availabilityLabel = labelFor(availabilityOptions, warehouse.availability)
  const related = relatedWarehouses(warehouse, data)

  return (
    <>
      <Seo
        title={`${warehouse.name}, ${typeLabel}`}
        description={`${warehouse.summary} ${location ? `Located at ${location.label}, ${location.corridor}.` : ''}`.trim()}
        path={`/warehouses/${warehouse.slug}`}
        type="article"
      />

      {/* Masthead */}
      <section className="relative isolate overflow-hidden bg-gb-graphite">
        <img
          src={warehouse.image}
          alt={warehouse.imageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="gb-scrim gb-scrim--even gb-grain absolute inset-0 -z-10" aria-hidden="true" />

        <Container className="relative pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-20">
          <Reveal variant="fade" className="mb-8 lg:mb-10">
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Warehouses', to: '/warehouses' },
                { label: warehouse.name },
              ]}
            />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal variant="fade">
              <Eyebrow tone="light">{typeLabel}</Eyebrow>
            </Reveal>

            <Reveal>
              <h1 className="text-display max-w-4xl text-gb-white">{warehouse.name}</h1>
            </Reveal>

            <Reveal variant="fade" delay={1}>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <li className="flex items-center gap-2 text-[0.875rem] text-gb-silver-light">
                  <Icon name="pin" className="h-4 w-4 text-gb-gold" />
                  {location ? `${location.label} · ${location.corridor}` : warehouse.location}
                </li>
                <li className="flex items-center gap-2 text-[0.875rem] text-gb-silver-light">
                  <Icon name="clock" className="h-4 w-4 text-gb-gold" />
                  {availabilityLabel}
                </li>
              </ul>
            </Reveal>

            <Reveal variant="fade" delay={2} className="mt-2">
              <Button href="#enquiry" variant="gold" size="lg" withArrow>
                Check availability
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Overview + key features */}
      <section className="bg-gb-white py-18 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Reveal variant="fade">
                <Eyebrow>Overview</Eyebrow>
              </Reveal>
              <Reveal>
                <h2 className="text-display-sm text-gb-graphite">
                  Is this the right space for your operation?
                </h2>
              </Reveal>
              {warehouse.overview.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={index + 1}>
                  <p className="text-lead gb-measure text-gb-industrial">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="fade">
                <div className="gb-ticks border border-gb-line-light bg-gb-pure p-6 sm:p-8">
                  <h2 className="text-eyebrow uppercase text-gb-gold-dark">Key features</h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {warehouse.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold-dark" />
                        <span className="text-[0.9375rem] leading-relaxed text-gb-industrial">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Specifications */}
      <section className="border-y border-gb-line-light bg-gb-pure py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Specifications"
            size="sm"
            title="What we can confirm today"
            lead="Facility type and connectivity are settled. We confirm measured figures once we understand the requirement and have walked the site with you."
          />
          <Reveal variant="fade" className="mt-10 lg:mt-12">
            <WarehouseSpecs warehouse={warehouse} />
          </Reveal>
        </Container>
      </section>

      {/* Location */}
      <section className="bg-gb-white py-18 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Location"
                size="sm"
                title="Where this facility sits"
                lead="Connectivity usually decides whether a facility works. Here is how this one sits."
              />
            </div>

            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <dl className="grid gap-px border border-gb-line-light bg-gb-line-light sm:grid-cols-2">
                  <div className="bg-gb-pure p-5">
                    <dt className="text-meta uppercase text-gb-concrete">Area</dt>
                    <dd className="mt-2 text-[0.9375rem] font-semibold text-gb-graphite">
                      {location?.label ?? 'Not listed'}
                    </dd>
                  </div>
                  <div className="bg-gb-pure p-5">
                    <dt className="text-meta uppercase text-gb-concrete">Corridor</dt>
                    <dd className="mt-2 text-[0.9375rem] font-semibold text-gb-graphite">
                      {location?.corridor ?? 'Not listed'}
                    </dd>
                  </div>
                  <div className="bg-gb-pure p-5">
                    <dt className="text-meta uppercase text-gb-concrete">City</dt>
                    <dd className="mt-2 text-[0.9375rem] font-semibold text-gb-graphite">
                      Bengaluru, Karnataka
                    </dd>
                  </div>
                  <div className="bg-gb-pure p-5">
                    <dt className="text-meta uppercase text-gb-concrete">Site address</dt>
                    <dd className="mt-2 text-[0.9375rem] text-gb-concrete italic">
                      Shared on enquiry
                    </dd>
                  </div>
                </dl>

                <p className="mt-5 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-gb-concrete">
                  <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold-dark" />
                  <span>
                    We share exact site addresses once a requirement is registered, so a visit can
                    be arranged with the facility team rather than turning up unannounced.
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="border-t border-gb-line-light bg-gb-pure py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading size="sm" eyebrow="Gallery" title="Inside and around the facility" />
          <Reveal variant="fade" className="mt-10 lg:mt-12">
            <WarehouseGallery images={warehouse.gallery} name={warehouse.name} />
          </Reveal>
        </Container>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-28 bg-gb-white py-18 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Enquiry"
                title="Want to know if this facility fits?"
                lead="Share your requirement and our team will confirm current availability, arrange a visit and share the measured specifications."
              />
            </div>

            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <EnquiryForm
                  facility={warehouse.name}
                  defaults={{ location: warehouse.location }}
                  submitLabel="Check availability"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-gb-line-light bg-gb-pure py-18 sm:py-20 lg:py-24">
          <Container>
            <SectionHeading
              eyebrow="Related facilities"
              size="sm"
              title="Other spaces worth a look"
              action={
                <Link
                  to="/warehouses"
                  className="gb-arrow-host flex items-center gap-2 text-[0.8125rem] font-semibold text-gb-graphite transition-colors duration-200 hover:text-gb-gold-dark"
                >
                  View all facilities
                  <Icon name="arrowRight" className="gb-arrow h-4 w-4" />
                </Link>
              }
            />

            <ul className="gb-stagger mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
              {related.map((item) => (
                <Reveal as="li" key={item.slug} className="h-full">
                  <WarehouseCard warehouse={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CTASection />
    </>
  )
}
