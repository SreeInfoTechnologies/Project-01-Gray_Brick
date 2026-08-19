import { useParallax } from '@/hooks/useParallax'
import { AnimatedWords } from './AnimatedWords'
import { Breadcrumbs } from './Breadcrumbs'
import { Container } from './Container'
import { Eyebrow } from './Eyebrow'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { cn } from '@/lib/cn'

/**
 * Shared masthead for every interior page: one photograph drifting against the
 * scroll, one scrim, one hierarchy, and an optional rail of page facts along
 * the base that echoes the ticker on the homepage hero.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  breadcrumbs,
  rail,
  children,
  className,
}) {
  const parallaxRef = useParallax(52)

  return (
    <section className={cn('relative isolate overflow-hidden bg-gb-black', className)}>
      <img
        ref={parallaxRef}
        src={image}
        alt={imageAlt}
        className="gb-photo gb-photo--backdrop gb-parallax absolute inset-x-0 -top-[9%] -z-20 h-[118%] w-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="gb-scrim gb-scrim--even gb-grain absolute inset-0 -z-10" aria-hidden="true" />
      <div className="gb-gridlines pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />

      <Container className="relative pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-40 lg:pb-20">
        {breadcrumbs ? (
          <Reveal variant="fade" className="mb-8 lg:mb-10">
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
        ) : null}

        <div className="flex max-w-4xl flex-col gap-5">
          {eyebrow ? (
            <Reveal variant="fade">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}

          <AnimatedWords as="h1" text={title} className="text-display text-gb-silver-light" />

          {lead ? (
            <Reveal delay={3}>
              <p className="text-lead gb-measure text-gb-silver-light">{lead}</p>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal variant="fade" delay={4} className="mt-3">
              {children}
            </Reveal>
          ) : null}
        </div>
      </Container>

      {rail?.length ? (
        <div className="relative border-t border-gb-line bg-gb-black/70 backdrop-blur-[2px]">
          <Container>
            <ul className="gb-stagger flex flex-wrap items-center gap-x-8 gap-y-3 py-4 sm:gap-x-12">
              {rail.map((item) => (
                <Reveal
                  as="li"
                  key={item.label}
                  variant="fade"
                  className="flex items-center gap-2.5"
                >
                  <Icon name={item.icon} className="h-4 w-4 shrink-0 text-gb-gold" />
                  <span className="text-meta whitespace-nowrap text-gb-silver uppercase">
                    {item.label}
                  </span>
                </Reveal>
              ))}
            </ul>
          </Container>
        </div>
      ) : null}
    </section>
  )
}
