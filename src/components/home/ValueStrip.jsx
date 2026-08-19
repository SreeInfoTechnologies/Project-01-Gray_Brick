import { Link } from 'react-router-dom'

import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { solutions } from '@/data/solutions'
import { cn } from '@/lib/cn'

// Short forms for the strip. The one-line note is what turns a row of labels
// into something worth reading. On a still page, bare labels do no work.
const STRIP = {
  'ready-to-move': { label: 'Ready-to-Move', note: 'Take it over as it stands.' },
  'built-to-suit': { label: 'Built-to-Suit', note: 'Built around your process.' },
  fulfillment: { label: 'Fulfillment', note: 'Picking, packing, dispatch.' },
  distribution: { label: 'Distribution', note: 'Dock-forward, for throughput.' },
  'supply-chain': { label: 'Supply Chain', note: 'Support through handover.' },
}

export function ValueStrip() {
  return (
    <section aria-label="What Gray Brick provides" className="bg-gb-charcoal">
      <Container>
        <ul className="grid grid-cols-2 border-t border-l border-gb-line-dark sm:grid-cols-3 lg:grid-cols-5">
          {solutions.map((solution, index) => (
            <li
              key={solution.id}
              className={cn(
                'border-r border-b border-gb-line-dark',
                // The fifth cell stretches to close the row at each breakpoint,
                // so the grid never ends on a half-empty line.
                index === solutions.length - 1 && 'col-span-2 sm:col-span-2 lg:col-span-1',
              )}
            >
              <Link
                to={`/solutions#${solution.id}`}
                className="group relative flex h-full flex-col gap-3 overflow-hidden px-4 py-6 sm:px-5 sm:py-7 lg:px-6 lg:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-gb-dark transition-transform duration-500 ease-[var(--ease-gb)] group-hover:scale-y-100"
                />

                <span className="relative flex items-start justify-between gap-3">
                  <Icon
                    name={solution.icon}
                    className="h-6 w-6 text-gb-gold transition-transform duration-500 ease-[var(--ease-gb)] group-hover:-translate-y-1 sm:h-7 sm:w-7"
                  />
                  <span className="text-[0.625rem] font-semibold tracking-[0.18em] text-gb-concrete-light transition-colors duration-300 group-hover:text-gb-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>

                <span className="relative mt-1 block text-[0.9375rem] font-semibold tracking-[0.02em] text-gb-white">
                  {STRIP[solution.id].label}
                </span>

                <span className="relative block text-[0.8125rem] leading-snug text-gb-concrete-light transition-colors duration-500 group-hover:text-gb-silver">
                  {STRIP[solution.id].note}
                </span>

                <span
                  aria-hidden="true"
                  className="relative mt-auto block h-px w-8 origin-left scale-x-0 bg-gb-gold transition-transform duration-500 ease-[var(--ease-gb)] group-hover:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
