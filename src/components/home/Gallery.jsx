import { Container } from '@/components/common/Container'
import { ImageFrame } from '@/components/common/ImageFrame'
import { SectionHeading } from '@/components/common/SectionHeading'
import { cn } from '@/lib/cn'
import floorReady from '@/assets/images/gb-floor-ready.webp'
import forecourtWide from '@/assets/images/gb-forecourt-wide.webp'
import frontageDusk from '@/assets/images/gb-frontage-dusk.webp'
import mezzanineStocked from '@/assets/images/gb-mezzanine-stocked.webp'

// Four frames, one of each kind of space: an exterior, an empty floor, a
// stocked floor, a second building. The road-frontage shot and the second
// stocked-floor shot were dropped as near-duplicates of frames already here;
// both still appear on their facility page and elsewhere on the site.
//
// The first one leads because it is the best of the set: the whole building,
// the loading opening and the forecourt in one frame.
const shots = [
  {
    src: forecourtWide,
    caption: 'Horamavu · front elevation and paved forecourt',
    alt: 'Horamavu facility: grey gable front, covered loading opening with stock on pallets, paved forecourt',
    feature: true,
  },
  {
    src: floorReady,
    caption: 'Horamavu · clear-span floor, ready to rack',
    alt: 'Empty clear-span floor in sealed red-oxide finish under a steel truss roof',
  },
  {
    src: mezzanineStocked,
    caption: 'HRBR Layout · storage mezzanine',
    alt: 'Steel mezzanine carrying cartoned stock above the picking floor',
  },
  {
    src: frontageDusk,
    caption: 'HRBR Layout · two-level frontage at dusk',
    alt: 'Two-level grey frontage with roller shutters and an external spiral stair, lit in the evening',
  },
]

export function Gallery() {
  return (
    <section aria-labelledby="gallery-heading" className="bg-gb-black py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Inside our facilities"
          index="03"
          title="What you would actually be moving into"
          lead="Photographed on site, not sourced from a stock library."
        />

        {/* The lead photograph runs the full width, and the other three sit in
            a row beneath it from md up. Four frames in this shape leave no
            frame stranded on a row of its own. */}
        <div className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
          {shots.map((shot) => (
            <figure key={shot.src} className={cn('relative', shot.feature && 'md:col-span-3')}>
              <ImageFrame
                src={shot.src}
                alt={shot.alt}
                ratio="auto"
                zoom
                className={cn(
                  'rounded-gb-sm',
                  shot.feature ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]',
                )}
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-gb-sm bg-gradient-to-t from-gb-black/85 to-transparent px-4 pt-12 pb-3.5 text-[0.8125rem] font-medium text-gb-white">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
