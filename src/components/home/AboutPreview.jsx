import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Reveal } from '@/components/common/Reveal'
import primaryImage from '@/assets/images/facility-interior-bright.webp'
import secondaryImage from '@/assets/images/truck-at-facility-portrait.webp'

const pillars = [
  {
    icon: 'pin',
    title: 'Location comes first',
    body: 'Where a facility sits decides how long every trip takes. We start from where your goods already move.',
  },
  {
    icon: 'sliders',
    title: 'A layout that matches the work',
    body: 'Storage, order handling and throughput each want a different floor. The building should follow the operation.',
  },
  {
    icon: 'layers',
    title: 'Room to grow into',
    body: 'Requirements change with demand. Planning for that now is cheaper than moving again in eighteen months.',
  },
  {
    icon: 'network',
    title: 'Support after the keys',
    body: 'Documentation, handover and the first few weeks of running. You keep one point of contact throughout.',
  },
]

export function AboutPreview() {
  return (
    <section className="bg-gb-white py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-7 lg:col-span-6 lg:pt-2">
            <Reveal variant="fade">
              <Eyebrow index="07">Why Gray Brick</Eyebrow>
            </Reveal>

            <Reveal>
              <h2 className="text-display text-gb-graphite">Find space without the guesswork</h2>
            </Reveal>

            <Reveal delay={1}>
              <p className="text-lead gb-measure text-gb-industrial">
                A warehouse has to work well beyond its four walls. Location, access, layout,
                loading and your expansion plans all matter. We help businesses check the fit before
                they commit to it.
              </p>
            </Reveal>

            <ul className="gb-stagger mt-2 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <Reveal as="li" key={pillar.title} className="flex flex-col gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center border border-gb-line-light text-gb-gold-dark">
                    <Icon name={pillar.icon} className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-[0.9375rem] font-semibold text-gb-graphite">{pillar.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-gb-concrete">{pillar.body}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="fade" delay={2} className="mt-3">
              <Button to="/about" variant="outline" withArrow>
                How we work
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <Reveal variant="clip">
                <ImageFrame
                  src={primaryImage}
                  alt="Interior of a completed warehouse with a clear, column-free floor"
                  ratio="4/3"
                  className="rounded-gb-sm"
                />
              </Reveal>

              {/* Secondary frame overlaps the primary one from the tablet
                  breakpoint up; on phones it is dropped rather than stacked, to
                  keep the section from turning into a column of photographs. */}
              <Reveal
                variant="fade"
                delay={2}
                className="absolute -bottom-10 -left-6 hidden w-[54%] sm:block lg:-left-10"
              >
                <ImageFrame
                  src={secondaryImage}
                  alt="Goods carrier positioned at the loading door of a warehousing facility"
                  ratio="4/5"
                  className="rounded-gb-sm border-4 border-gb-white"
                />
              </Reveal>
            </div>

            <div className="mt-8 border-t border-gb-line-light pt-6 sm:mt-16 lg:mt-20">
              <p className="gb-measure-tight text-[0.9375rem] leading-relaxed text-gb-industrial">
                <span className="font-semibold text-gb-graphite">The shed is the easy part.</span>{' '}
                What decides whether a facility works is how goods get in, where they sit, and how
                quickly they get out again. So that is what we go through with you first.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
