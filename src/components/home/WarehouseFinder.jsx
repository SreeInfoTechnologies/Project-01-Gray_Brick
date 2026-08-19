import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { SelectField } from '@/components/common/Field'
import { Icon } from '@/components/common/Icon'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import backdrop from '@/assets/images/rail-container-freight.webp'
import {
  availabilityOptions,
  businessRequirements,
  locations,
  spaceBands,
  warehouseTypes,
} from '@/data/warehouses'

const initialCriteria = {
  location: '',
  type: '',
  availability: '',
  space: '',
  requirement: '',
}

/**
 * The signature entry point into the inventory.
 *
 * Location, type and availability narrow the listing. Space and business
 * requirement describe what the visitor needs rather than what we hold, so
 * they travel with the query and pre-fill the enquiry form instead of
 * filtering facilities against numbers we have not published.
 */
export function WarehouseFinder() {
  const navigate = useNavigate()
  const [criteria, setCriteria] = useState(initialCriteria)

  const update = (field) => (event) =>
    setCriteria((current) => ({ ...current, [field]: event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams(
      Object.entries(criteria).filter(([, value]) => value !== ''),
    )
    const query = params.toString()
    navigate(query ? `/warehouses?${query}` : '/warehouses')
  }

  return (
    <section className="relative isolate overflow-hidden bg-gb-graphite py-20 sm:py-24 lg:py-32">
      <img
        src={backdrop}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        loading="lazy"
        decoding="async"
      />
      <div className="gb-scrim gb-scrim--soft gb-grain absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          tone="light"
          eyebrow="Warehouse finder"
          index="04"
          title="Looking for warehouse space in Bengaluru?"
          lead="Share the basics of your requirement and we will show you what fits, including the options worth a look that you may not have considered."
        />

        <Reveal variant="fade" delay={1} className="mt-10 lg:mt-14">
          <form
            onSubmit={onSubmit}
            className="gb-ticks rounded-gb-sm border border-gb-line-light bg-gb-pure p-6 shadow-gb-panel sm:p-8"
          >
            <fieldset className="border-0 p-0">
              <legend className="sr-only">Search criteria</legend>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                <SelectField
          hideOptional
                  id="finder-location"
                  label="Where do you need space?"
                  placeholder="Any corridor"
                  options={locations.map((item) => ({ value: item.value, label: item.label }))}
                  value={criteria.location}
                  onChange={update('location')}
                />

                <SelectField
          hideOptional
                  id="finder-type"
                  label="What kind of facility?"
                  placeholder="Any type"
                  options={warehouseTypes}
                  value={criteria.type}
                  onChange={update('type')}
                />

                <SelectField
          hideOptional
                  id="finder-availability"
                  label="Availability"
                  placeholder="Any status"
                  options={availabilityOptions}
                  value={criteria.availability}
                  onChange={update('availability')}
                />

                <SelectField
          hideOptional
                  id="finder-space"
                  label="How much space?"
                  placeholder="Not sure yet"
                  options={spaceBands}
                  value={criteria.space}
                  onChange={update('space')}
                />

                <SelectField
          hideOptional
                  id="finder-requirement"
                  label="What is it for?"
                  placeholder="Not sure yet"
                  options={businessRequirements}
                  value={criteria.requirement}
                  onChange={update('requirement')}
                />

                <div className="flex items-end">
                  <Button type="submit" variant="primary" size="lg" withArrow className="w-full">
                    Find my warehouse
                  </Button>
                </div>
              </div>
            </fieldset>

            <p className="mt-6 flex items-start gap-2 border-t border-gb-line-light pt-5 text-[0.8125rem] leading-relaxed text-gb-concrete">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold-dark" />
              <span>
                Your space and use case travel with the enquiry, so the team can come back with
                something useful instead of a brochure.
              </span>
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
