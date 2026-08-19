import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Reveal } from '@/components/common/Reveal'
import { Seo } from '@/components/common/Seo'
import { primaryNav } from '@/data/navigation'
import backdrop from '@/assets/images/hall-steel-trusses.webp'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="That page is not here. Browse warehouse space, solutions and facilities from Gray Brick Infra in Bengaluru."
        path="/404"
      />

      <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-gb-black">
        <img
          src={backdrop}
          alt=""
          aria-hidden="true"
          className="gb-photo gb-photo--backdrop absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        />
        <div className="gb-scrim gb-scrim--even gb-grain absolute inset-0 -z-10" aria-hidden="true" />

        <Container className="relative py-28 lg:py-36">
          <div className="flex max-w-2xl flex-col gap-6">
            <Reveal variant="fade">
              <Eyebrow>Error 404</Eyebrow>
            </Reveal>

            <Reveal>
              <h1 className="text-display text-gb-silver-light">This page is not on the plan</h1>
            </Reveal>

            <Reveal delay={1}>
              <p className="text-lead gb-measure text-gb-silver-light">
                The address you followed does not lead anywhere on this site. It may have moved,
                or the link may be out of date.
              </p>
            </Reveal>

            <Reveal variant="fade" delay={2} className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button to="/" variant="gold" size="lg" withArrow>
                Back to home
              </Button>
              <Button to="/warehouses" variant="outlineLight" size="lg">
                Explore warehouses
              </Button>
            </Reveal>

            <Reveal variant="fade" delay={3} className="mt-6 border-t border-gb-line pt-6">
              <p className="text-meta uppercase text-gb-silver-dark">Or go straight to</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {primaryNav.slice(1).map((item) => (
                  <li key={item.to}>
                    <Button to={item.to} variant="textLight" size="sm" withArrow>
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
