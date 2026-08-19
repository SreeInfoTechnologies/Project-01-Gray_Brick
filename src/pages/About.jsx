import { Button } from '@/components/common/Button'
import { CTASection } from '@/components/common/CTASection'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Seo } from '@/components/common/Seo'
import { Leadership } from '@/components/about/Leadership'
import heroImage from '@/assets/images/container-truck-dusk.webp'
import storyImage from '@/assets/images/hall-steel-trusses.webp'
import approachImage from '@/assets/images/industrial-facade.webp'
import { addressLines, directionsUrl } from '@/data/company'

const values = [
  {
    icon: 'check',
    title: 'Reliability',
    body: 'What we say a building will do, it does. Where it will not, we say so before the agreement rather than after. It costs us a few deals and saves everyone a lot more.',
  },
  {
    icon: 'sliders',
    title: 'Efficiency',
    body: 'Space costs money and so does movement. We plan for both, so the layout works with the operation instead of forcing it to bend.',
  },
  {
    icon: 'layers',
    title: 'Flexibility',
    body: 'Requirements change with demand, seasons and growth. We configure facilities so a change of plan does not have to mean a change of address.',
  },
  {
    icon: 'network',
    title: 'Long-term partnerships',
    body: 'Handover is where the relationship starts. We stay involved through setup and stay reachable once you are running.',
  },
]

const approach = [
  {
    step: '01',
    title: 'Understand the operation',
    body: 'What arrives, how it is stored, how orders get built and when they leave. We define the requirement before discussing any building.',
  },
  {
    step: '02',
    title: 'Match it to a corridor',
    body: 'Location follows where your goods already travel. The corridor, the connectivity, and how far it is to the customers you serve.',
  },
  {
    step: '03',
    title: 'Evaluate the facility',
    body: 'We walk sites with the requirement in hand, so the assessment is about fit rather than what happens to be vacant.',
  },
  {
    step: '04',
    title: 'Support the setup',
    body: 'Documentation, handover and the first few weeks of running, with one point of contact throughout.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Gray Brick Infra"
        description="Gray Brick Infra Pvt. Ltd. helps businesses find and set up warehouse space in and around Bengaluru. Ready-to-move, built-to-suit, fulfillment and distribution."
        path="/about"
      />

      <PageHero
        eyebrow="About"
        title="Warehousing is part of the operation, not just the property"
        lead="The right warehouse decides how stock is held, how a team works through a shift, how goods move and how well the business serves its customers. We focus on space that is practical for real operations."
        image={heroImage}
        imageAlt="Container-bodied goods vehicle at an industrial facility at dusk"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        rail={[
          { icon: 'pin', label: 'Banaswadi, Bengaluru North' },
          { icon: 'warehouse', label: 'Warehousing and distribution' },
          { icon: 'network', label: 'Support through handover' },
        ]}
      />

      {/* Who we are */}
      <section className="bg-gb-white py-18 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Reveal variant="fade">
                <Eyebrow>Who we are</Eyebrow>
              </Reveal>

              <Reveal>
                <h2 className="text-display text-gb-graphite">
                  A warehousing partner, not a landlord
                </h2>
              </Reveal>

              <Reveal delay={1}>
                <p className="text-lead gb-measure text-gb-industrial">
                  We help businesses find warehouse space that fits how they work. That means
                  ready-to-move and built-to-suit facilities, fulfillment and distribution space,
                  and help with the parts of the process that usually get left to the occupier.
                </p>
              </Reveal>

              <Reveal delay={2}>
                <p className="gb-measure text-[0.9375rem] leading-relaxed text-gb-industrial">
                  We are based in Bengaluru and work across the industrial corridors that serve
                  the city. That focus is deliberate. Knowing how a corridor connects, how vehicles
                  move through it and what it is like at seven in the morning is worth more to an
                  occupier than a longer list of buildings in places we have never worked.
                </p>
              </Reveal>

              <Reveal variant="fade" delay={3} className="mt-2">
                <Button to="/warehouses" variant="outline" withArrow>
                  See our facilities
                </Button>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="clip">
                <ImageFrame
                  src={storyImage}
                  alt="Steel-framed warehouse hall with clear-span roof structure"
                  ratio="4/3"
                  className="rounded-gb-sm"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Leadership />

      {/* Philosophy */}
      <section className="relative isolate overflow-hidden bg-gb-graphite py-20 sm:py-24 lg:py-32">
        <div className="gb-gridlines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                tone="light"
                eyebrow="Philosophy"
                title="The shed is the easy part"
              />
            </div>

            <div className="flex flex-col gap-6 lg:col-span-7">
              <Reveal delay={1}>
                <p className="text-lead gb-measure text-gb-silver-light">
                  Anyone can point at a building. What decides whether a facility works is how
                  goods get in, where they sit, how quickly someone can find them, and how cleanly
                  they go out again.
                </p>
              </Reveal>

              <Reveal delay={2}>
                <p className="gb-measure text-[0.9375rem] leading-relaxed text-gb-silver">
                  So we start with the operation before looking at any floor plate. Once we
                  understand what moves through a business, the shortlist of buildings that can
                  genuinely support it usually gets much shorter, and much more useful.
                </p>
              </Reveal>

              <Reveal variant="fade" delay={3} className="mt-2">
                <ImageFrame
                  src={approachImage}
                  alt="Cladding and screen detail across a modern industrial elevation"
                  ratio="21/9"
                  className="rounded-gb-sm"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-gb-pure py-18 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Approach"
            title="How an enquiry becomes an operation"
            lead="Four stages, in the same order every time. There is nothing clever about it. It is just done properly."
          />

          <ol className="gb-stagger mt-12 grid gap-px border border-gb-line-light bg-gb-line-light sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {approach.map((item) => (
              <Reveal as="li" key={item.step} className="flex flex-col gap-4 bg-gb-pure p-6 lg:p-8">
                <span className="text-[0.6875rem] font-semibold tracking-[0.18em] text-gb-gold-dark">
                  {item.step}
                </span>
                <h3 className="text-lg leading-snug font-bold tracking-tight text-gb-graphite">
                  {item.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-gb-concrete">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-gb-white py-18 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Values" title="What we hold ourselves to" />

          <ul className="gb-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
            {values.map((value) => (
              <Reveal
                as="li"
                key={value.title}
                className="gb-ticks flex flex-col gap-4 border border-gb-line-light bg-gb-pure p-6 sm:p-8"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-gb-line-light text-gb-gold-dark">
                  <Icon name={value.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="text-display-sm text-gb-graphite">{value.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-gb-industrial">{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Office */}
      <section className="border-t border-gb-line-light bg-gb-pure py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5">
              <Reveal variant="fade">
                <Eyebrow>Where we are</Eyebrow>
              </Reveal>
              <Reveal>
                <address className="text-display-sm text-gb-graphite not-italic">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Reveal>
            </div>

            <Reveal variant="fade" delay={1} className="flex flex-col gap-3 sm:flex-row">
              <Button href={directionsUrl} variant="outline">
                Get directions
              </Button>
              <Button to="/contact" variant="primary" withArrow>
                Talk to Gray Brick
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
