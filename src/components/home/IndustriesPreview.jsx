import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { SectionHeading } from '@/components/common/SectionHeading'
import { industries } from '@/data/industries'
import { cn } from '@/lib/cn'

// Stretch the final tile to close the last row, whatever the list length
// happens to be. Static lookups so Tailwind still sees every class.
const SM_FILL = { 1: 'sm:col-span-2', 0: '' }
const LG_FILL = { 1: 'lg:col-span-4', 2: 'lg:col-span-3', 3: 'lg:col-span-2', 0: '' }

export function IndustriesPreview() {
  const lastFill = cn(SM_FILL[industries.length % 2], LG_FILL[industries.length % 4])

  return (
    <section className="bg-gb-white py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Who we work with"
          index="06"
          title="Different sectors, different floors"
          lead="A parts store and a quick-commerce operation can take identical buildings and still need completely different things from them."
          action={
            <Button to="/industries" variant="outline" withArrow>
              All industries
            </Button>
          }
        />

        <ul className="mt-12 grid grid-cols-1 border-t border-l border-gb-line-light sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <li
              key={industry.id}
              className={cn(
                'border-r border-b border-gb-line-light',
                index === industries.length - 1 && lastFill,
              )}
            >
              <Link
                to={`/industries#${industry.id}`}
                className="group flex h-full flex-col gap-3 bg-gb-pure p-6 transition-colors duration-300 hover:bg-gb-graphite lg:p-7"
              >
                <Icon
                  name={industry.icon}
                  className="h-7 w-7 text-gb-gold-dark transition-colors duration-300 group-hover:text-gb-gold"
                />
                <h3 className="mt-1 text-lg font-semibold text-gb-graphite transition-colors duration-300 group-hover:text-gb-white">
                  {industry.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-gb-concrete transition-colors duration-300 group-hover:text-gb-silver">
                  {industry.summary}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-4 text-[0.75rem] font-semibold tracking-[0.08em] text-gb-industrial uppercase transition-colors duration-300 group-hover:text-gb-gold">
                  View sector
                  <Icon name="arrowRight" className="gb-arrow h-3.5 w-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
