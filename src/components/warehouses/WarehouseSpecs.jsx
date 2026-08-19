import { Icon } from '@/components/common/Icon'
import { ON_REQUEST, buildSpecifications } from '@/data/warehouses'
import { cn } from '@/lib/cn'

/**
 * Specification table.
 *
 * Values Gray Brick has not published render as "Available on request" in a
 * muted treatment rather than being invented or silently dropped. The reader
 * can see which fields exist and which are confirmed at evaluation.
 */
export function WarehouseSpecs({ warehouse }) {
  const specifications = buildSpecifications(warehouse)

  return (
    <div>
      <dl className="grid grid-cols-1 border-t border-l border-gb-line sm:grid-cols-2 lg:grid-cols-4">
        {specifications.map((spec) => {
          const onRequest = spec.value === ON_REQUEST
          return (
            <div
              key={spec.label}
              className="flex flex-col gap-2 border-r border-b border-gb-line bg-gb-graphite p-5"
            >
              <dt className="text-meta uppercase text-gb-silver-dark">{spec.label}</dt>
              <dd
                className={cn(
                  'text-[0.9375rem] leading-snug',
                  onRequest ? 'text-gb-silver-dark italic' : 'font-semibold text-gb-silver-light',
                )}
              >
                {spec.value}
              </dd>
            </div>
          )
        })}
      </dl>

      <p className="mt-5 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-gb-silver-dark">
        <Icon name="ruler" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold" />
        <span>
          Measured figures are shared during site evaluation, once the requirement is understood and
          the facility has been walked.
        </span>
      </p>
    </div>
  )
}
