import { Container } from '@/components/common/Container'
import { ImageFrame } from '@/components/common/ImageFrame'
import { SectionHeading } from '@/components/common/SectionHeading'
import { cn } from '@/lib/cn'
import floorReady from '@/assets/images/gb-floor-ready.webp'
import forecourtWide from '@/assets/images/gb-forecourt-wide.webp'
import frontageDusk from '@/assets/images/gb-frontage-dusk.webp'
import mezzanineFmcg from '@/assets/images/gb-mezzanine-fmcg.webp'
import mezzanineStocked from '@/assets/images/gb-mezzanine-stocked.webp'
import streetLoading from '@/assets/images/gb-street-loading.webp'

// Every photograph Gray Brick supplied, once each. The first one leads because
// it is the best of the set: the whole building, the loading opening and the
// forecourt in one frame.
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
    src: streetLoading,
    caption: 'HRBR Layout · 100 Feet Road frontage',
    alt: 'Road frontage with rider vehicles at the loading bay and stock on pallets inside',
  },
  {
    src: mezzanineFmcg,
    caption: 'HRBR Layout · stocked floor',
    alt: 'Cartoned fast-moving goods across the floor and mezzanine under the truss roof',
  },
  {
    src: frontageDusk,
    caption: 'Two-level frontage at dusk',
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

        {/* 3-column bento from lg: the lead photograph takes two columns and
            two rows, two frames stack beside it, and three run beneath. */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4">
          {shots.map((shot) => (
            <figure
              key={shot.src}
              className={cn('relative', shot.feature && 'sm:col-span-2 lg:row-span-2')}
            >
              <ImageFrame
                src={shot.src}
                alt={shot.alt}
                ratio="auto"
                zoom
                className={cn('rounded-gb-sm aspect-[4/3]', shot.feature && 'lg:aspect-auto lg:h-full')}
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
