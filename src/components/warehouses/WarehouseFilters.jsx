import { Button } from '@/components/common/Button'
import { SelectField } from '@/components/common/Field'
import { Icon } from '@/components/common/Icon'
import { Skeleton } from '@/components/common/Skeleton'
import { availabilityOptions, labelFor, locations, warehouseTypes } from '@/data/warehouses'

const chipSources = {
  location: locations,
  type: warehouseTypes,
  availability: availabilityOptions,
}

const chipLabels = {
  location: 'Location',
  type: 'Type',
  availability: 'Availability',
}

/**
 * Listing filters. State lives in the URL so a filtered view can be shared,
 * bookmarked, and arrived at directly from the homepage finder.
 */
export function WarehouseFilters({ filters, onChange, onClear, resultCount, totalCount, loading }) {
  const activeKeys = Object.keys(chipSources).filter((key) => filters[key])

  const update = (field) => (event) => onChange(field, event.target.value)

  return (
    <section aria-label="Filter facilities" className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:gap-5">
        <SelectField
          hideOptional
          id="filter-location"
          label="Where do you need space?"
          placeholder="All corridors"
          options={locations.map((item) => ({ value: item.value, label: item.label }))}
          value={filters.location}
          onChange={update('location')}
        />

        <SelectField
          hideOptional
          id="filter-type"
          label="What kind of facility?"
          placeholder="All types"
          options={warehouseTypes}
          value={filters.type}
          onChange={update('type')}
        />

        <SelectField
          hideOptional
          id="filter-availability"
          label="Availability"
          placeholder="Any status"
          options={availabilityOptions}
          value={filters.availability}
          onChange={update('availability')}
        />

        <div className="flex items-center justify-between gap-4 lg:h-12">
          {loading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <p aria-live="polite" className="text-[0.8125rem] text-gb-silver">
              <span className="font-semibold text-gb-silver-light">{resultCount}</span>
              {' of '}
              {totalCount} facilities
            </p>
          )}

          {activeKeys.length > 0 ? (
            <Button variant="text" size="sm" onClick={onClear}>
              Clear all
            </Button>
          ) : null}
        </div>
      </div>

      {activeKeys.length > 0 ? (
        <ul className="flex flex-wrap items-center gap-2">
          {activeKeys.map((key) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => onChange(key, '')}
                className="flex items-center gap-2 rounded-gb-sm border border-gb-line-strong bg-gb-graphite py-1.5 pr-2.5 pl-3 text-[0.8125rem] text-gb-silver-light transition-colors duration-200 hover:border-gb-concrete"
              >
                <span className="text-gb-silver-dark">{chipLabels[key]}:</span>
                {labelFor(chipSources[key], filters[key])}
                <Icon name="close" className="h-3.5 w-3.5 text-gb-silver-dark" />
                <span className="sr-only">Remove this filter</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
