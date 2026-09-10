import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { PartnerLogos } from '@/components/common/PartnerLogos'

/**
 * Partner proof, directly under the hero: the first thing a visitor checks on a
 * B2B site is who else already relies on it.
 */
export function Partners() {
  return (
    <section aria-labelledby="partners-heading" className="border-b border-gb-line bg-gb-black py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-72 lg:shrink-0">
            <Eyebrow index="01">Our partners</Eyebrow>
            <h2
              id="partners-heading"
              className="mt-4 text-xl leading-snug font-bold tracking-tight text-gb-silver-light sm:text-2xl"
            >
              Space that runs quick commerce and e-commerce every day
            </h2>
          </div>

          <PartnerLogos className="min-w-0 flex-1" />
        </div>
      </Container>
    </section>
  )
}
