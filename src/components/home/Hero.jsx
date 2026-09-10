import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Icon } from '@/components/common/Icon'
import brandedTall from '@/assets/images/gb-forecourt-branded-tall.webp'
import brandedWide from '@/assets/images/gb-forecourt-branded-wide.webp'
import { locations } from '@/data/warehouses'

/**
 * Opening statement, built as a split: the message on solid ground on the
 * left, Gray Brick's Horamavu facility on the right with the company logo
 * mounted on its gable.
 *
 * A split rather than text over a full-bleed photograph because the gable is
 * where the logo sits, and in a full-bleed frame the headline lands exactly on
 * top of it. Here nothing covers the building, the logo or the copy.
 *
 * The photograph carries the logo as signage (composited from the brand
 * artwork in src/assets/brand). The same photograph without it is what the
 * gallery and facility pages show.
 *
 * Motion: a one-time entrance on load. Nothing responds to scroll.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gb-black">
      <div
        className="gb-gridlines pointer-events-none absolute inset-0 z-0 opacity-60"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2">
          <div className="gb-intro flex flex-col justify-center gap-6 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:min-h-[90svh] lg:gap-7 lg:py-28 lg:pr-14">
            <Eyebrow>Warehousing in Bengaluru</Eyebrow>

            <span className="block h-px w-full bg-gb-line-strong" aria-hidden="true" />

            <h1 className="text-display text-gb-white">
              Warehouse space that fits the way you operate.
            </h1>

            <p className="text-lead gb-measure text-gb-silver-light">
              Ready-to-move and built-to-suit space for storage, fulfilment and distribution, from two
              facilities of our own in north-east Bengaluru.
            </p>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/warehouses" variant="primary" size="lg" withArrow>
                See our warehouses
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Talk to Gray Brick
              </Button>
            </div>

            <ul className="mt-4 grid gap-5 border-t border-gb-line pt-6 sm:grid-cols-2 sm:gap-8">
              {locations.map((location) => (
                <li key={location.value} className="flex gap-3">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold" />
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-semibold text-gb-white">
                      {location.label}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-gb-silver">
                      {location.address}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Photograph. A band under the message below lg, the right half of the
          frame from lg up. The portrait crop is centred on the gable and the
          loading opening, so the logo is in frame at every width. */}
      <div className="relative z-0 aspect-[4/3] w-full sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
        <picture>
          <source media="(min-width: 1024px)" srcSet={brandedTall} />
          <img
            src={brandedWide}
            alt="The Gray Brick Infra facility at Horamavu, Bengaluru, with the company logo on its gable and stock on pallets inside the loading opening"
            className="gb-photo gb-kenburns h-full w-full object-cover object-[50%_35%]"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>

        {/* Feathered seam so the panel meets the photograph without a hard edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-gb-black to-transparent lg:block"
        />

        {/* The transparent header crosses this image from lg up and the top of
            the frame is open sky, so the nav links get a shaded band. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-gb-black/80 to-transparent lg:block"
        />
      </div>
    </section>
  )
}
