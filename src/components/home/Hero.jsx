import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Icon } from '@/components/common/Icon'
import frontageDusk from '@/assets/images/gb-frontage-dusk.webp'
import { locations } from '@/data/warehouses'

/**
 * Opening statement: the message on the left, a Gray Brick unit on the right,
 * the two facility addresses across the foot.
 *
 * The frame is 3:2 and the photograph is 4:3, which is the widest shape that
 * still shows this building whole — it fills its frame from roofline to ground,
 * so a wide hero band would cut the roof off the top and the forecourt off the
 * bottom. Only a little sky and paving is trimmed here.
 *
 * The photograph is sized in a column rather than run full-width for the same
 * reason: at the full width of the container a 3:2 frame would stand taller
 * than the viewport.
 *
 * Why gray: the company is Gray Brick, and the logo was photographed on a gray
 * brick wall. The section takes the concrete surface and the brick texture
 * rather than the page's black. Text here stays at silver-light or brighter;
 * silver-dark does not clear AA on this surface.
 *
 * Motion: a one-time entrance on load. Nothing responds to scroll.
 */
export function Hero() {
  return (
    <section className="gb-brick relative isolate overflow-hidden bg-gb-concrete">
      <Container className="relative z-10 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="gb-intro grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Message ------------------------------------------------------ */}
          <div className="flex flex-col gap-6 lg:col-span-5">
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
          </div>

          {/* Photograph --------------------------------------------------- */}
          <figure className="relative overflow-hidden rounded-gb-sm border border-gb-line-strong aspect-[3/2] lg:col-span-7">
            <img
              src={frontageDusk}
              alt="The Gray Brick facility at HRBR Layout, Bengaluru: two levels in grey render, roller shutters to the ground floor, an external spiral stair and the wall lights on at dusk"
              className="gb-photo gb-kenburns h-full w-full object-cover object-center"
              fetchPriority="high"
              decoding="sync"
            />
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 border border-gb-line-strong bg-gb-black/80 px-3 py-2 text-[0.75rem] font-medium text-gb-white backdrop-blur-sm sm:bottom-5 sm:left-5">
              <Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-gb-gold" />
              HRBR Layout facility
            </figcaption>
          </figure>
        </div>

        {/* The two facilities. On a site whose whole offer is location, where
            the buildings are belongs above the fold. */}
        <ul className="mt-10 grid gap-6 border-t border-gb-line pt-7 sm:grid-cols-2 sm:gap-x-12 lg:mt-14">
          {locations.map((location) => (
            <li key={location.value} className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold" />
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-semibold text-gb-white">
                  {location.label}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-gb-silver-light">
                  {location.address}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
