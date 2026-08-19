import { Link } from 'react-router-dom'

import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Reveal } from '@/components/common/Reveal'
import { industries } from '@/data/industries'

/**
 * Sector proof, stated plainly.
 *
 * No customer logos appear here, because Gray Brick has not published a
 * verified list. Naming the sectors we build for is honest and still tells a
 * visitor within two seconds whether this is a site for them.
 */
export function TrustBand() {
  return (
    <section aria-labelledby="trust-heading" className="gb-concrete border-b border-gb-line bg-gb-black py-12 sm:py-14">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-14">
          <div className="lg:max-w-sm lg:shrink-0">
            <Reveal variant="fade">
              <Eyebrow index="01">Who it is for</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 id="trust-heading" className="mt-4 text-xl leading-snug font-bold tracking-tight text-gb-silver-light sm:text-2xl">
                Built for businesses that need to keep moving
              </h2>
            </Reveal>
          </div>

          <div className="min-w-0 flex-1">
            <Reveal variant="fade" delay={1}>
              <p className="gb-measure text-[0.9375rem] leading-relaxed text-gb-silver">
                From modern commerce to distribution-led operations, the warehouse has to fit the
                way a team already works. Changing the operation to suit the building is the
                expensive way round.
              </p>
            </Reveal>

            <ul className="gb-stagger mt-6 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Reveal as="li" key={industry.id} variant="fade">
                  <Link
                    to={`/industries#${industry.id}`}
                    className="block gb-card px-3.5 py-2 text-[0.8125rem] font-medium text-gb-silver transition-[border-color,color,transform] duration-300 ease-[var(--ease-gb)] hover:-translate-y-0.5 hover:border-gb-gold hover:text-gb-black"
                  >
                    {industry.title}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
