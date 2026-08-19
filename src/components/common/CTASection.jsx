import { useParallax } from '@/hooks/useParallax'
import { useMotionEnabled } from '@/lib/motion'
import { Button } from './Button'
import { Container } from './Container'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import ctaImage from '@/assets/images/container-port.webp'

/**
 * The final conversion point before the footer. It appears on every page, so
 * it is deliberately the loudest gold moment on the site and nothing else
 * competes with it.
 */
export function CTASection({
  eyebrow = 'Next step',
  title = 'Your next operation starts with the right space.',
  description = 'Opening a new location, expanding an existing one, or simply stuck with a setup that no longer works? Start by telling us what you need.',
  primaryLabel = 'Discuss your requirement',
  primaryTo = '/contact',
  secondaryLabel = 'Explore warehouses',
  secondaryTo = '/warehouses',
}) {
  const motion = useMotionEnabled()
  const parallaxRef = useParallax(60, motion)

  return (
    <section className="relative isolate overflow-hidden bg-gb-black">
      <img
        ref={parallaxRef}
        src={ctaImage}
        alt=""
        aria-hidden="true"
        className="gb-photo gb-photo--backdrop gb-parallax absolute inset-x-0 -top-[10%] -z-20 h-[120%] w-full object-cover opacity-55"
        loading="lazy"
        decoding="async"
      />
      <div className="gb-scrim gb-scrim--even gb-grain absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex max-w-2xl flex-col gap-5">
            <Reveal variant="fade">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="text-display text-gb-silver-light">{title}</h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-lead gb-measure text-gb-silver-light">{description}</p>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={2} className="flex shrink-0 flex-col gap-3 sm:flex-row lg:pb-1">
            <Button to={primaryTo} variant="gold" size="lg" withArrow>
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="outlineLight" size="lg">
              {secondaryLabel}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
