import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import aisleTall from '@/assets/images/hero-aisle-tall.webp'
import aisleWide from '@/assets/images/hero-aisle-wide.webp'

/**
 * Opening statement, built as a split rather than text over a photograph.
 *
 * The message sits on solid graphite, so it needs no scrim and its contrast is
 * fixed rather than dependent on whatever is behind it. The photograph then
 * gets the other half at full strength instead of being dimmed into mud, and
 * it earns its place by showing the actual product: stocked racking running
 * away to a vanishing point.
 *
 * The panel is sized by its content, which is what stops tall screens opening
 * with a third of a page of dead air.
 *
 * Motion: a one-time entrance on load. Nothing responds to scroll.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gb-graphite">
      <div
        className="gb-gridlines pointer-events-none absolute inset-0 z-0 opacity-60"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2">
          <div className="gb-intro flex flex-col justify-center gap-6 py-16 sm:py-20 lg:min-h-[82svh] lg:gap-7 lg:py-24 lg:pr-14">
            <Eyebrow tone="light">Warehousing &amp; logistics infrastructure</Eyebrow>

            {/* The rule the rest of the panel hangs from. */}
            <span className="block h-px w-full bg-gb-line-dark-strong" aria-hidden="true" />

            <h1 className="text-display text-gb-white">
              Warehouse space that fits the way you operate.
            </h1>

            <p className="text-lead gb-measure text-gb-silver-light">
              Ready-to-move and built-to-suit warehousing across Bengaluru. Tell us what you need to
              store and where, and we will help you find the space that fits.
            </p>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/warehouses" variant="gold" size="lg" withArrow>
                Explore warehouses
              </Button>
              <Button to="/contact" variant="outlineLight" size="lg">
                Talk to Gray Brick
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Photograph. A band under the message on small screens, the right half
          of the frame from lg up. One element, repositioned. */}
      <div className="relative z-0 aspect-[16/10] w-full sm:aspect-[21/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[46%]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={aisleTall} />
          <img
            src={aisleWide}
            alt="Stocked racking running the length of a warehouse aisle"
            className="gb-kenburns h-full w-full object-cover"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>

        {/* Feathered seam so the panel meets the photograph without a hard edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-gb-graphite to-transparent lg:block"
        />

        {/* The transparent header crosses this image from lg up, and the top of
            the frame is bright ceiling lighting. Without this band the last two
            nav links fall below 2:1 against it. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-gb-graphite via-gb-graphite/70 to-transparent lg:block"
        />
      </div>
    </section>
  )
}
