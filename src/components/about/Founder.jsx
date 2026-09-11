import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Reveal } from '@/components/common/Reveal'
import portrait from '@/assets/images/founder-portrait.webp'
import { company } from '@/data/company'

/**
 * Founder.
 *
 * The one section on the site that is about a person rather than a building,
 * so it reads differently from the panels around it: an offset gold frame
 * behind the portrait, an attributed statement, and a specification strip that
 * borrows the hairline grid the facility pages use for their data.
 *
 * The portrait is Gray Brick's own studio photograph of the founder (supplied
 * as Ceo-Gray-Brick.png). It is shown as shot, with no colour grade, because
 * it was lit and graded by the photographer already.
 *
 * Everything rendered here comes from `company.founder`. Each optional field is
 * guarded, so clearing the statement or emptying `facts` collapses that part of
 * the layout rather than leaving a gap behind.
 */
export function Founder() {
  const { name, title, intro, message, facts = [] } = company.founder

  return (
    <section
      // The founder's Person node in the structured data uses this anchor as
      // its URL (/about/#founder), so it must stay stable.
      id="founder"
      aria-labelledby="founder-heading"
      className="gb-concrete relative scroll-mt-20 border-y border-gb-line bg-gb-black py-18 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Portrait ---------------------------------------------------- */}
          <div className="lg:col-span-5">
            {/* Capped and left-aligned below lg: a 4:5 crop at full container
                width would be an enormous headshot. */}
            <div className="max-w-sm sm:max-w-md lg:max-w-none">
              <div className="relative">
                {/* Offset hairline frame, stepped down and left. Decorative,
                    and dropped on phones where the inset would reach the page
                    gutter. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 -left-4 hidden h-full w-full border border-gb-line-gold sm:block"
                />

                <Reveal variant="clip" className="relative">
                  <ImageFrame
                    src={portrait}
                    alt={`${name}, ${title} of ${company.legalName}`}
                    ratio="4/5"
                    className="rounded-gb-sm border border-gb-line-strong"
                  >
                    {/* Name plate across the foot of the portrait. */}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gb-black/90 via-gb-black/55 to-transparent px-5 pt-16 pb-4 sm:px-6 sm:pb-5">
                      <span className="block text-[1.0625rem] font-semibold text-gb-white">{name}</span>
                      <span className="mt-1 block text-meta uppercase text-gb-gold-soft">{title}</span>
                    </span>
                  </ImageFrame>
                </Reveal>
              </div>

              <Reveal variant="fade" delay={2} className="mt-8 border-t border-gb-line pt-3 sm:mt-9">
                <p className="text-meta uppercase text-gb-silver-dark">{company.legalName}</p>
              </Reveal>
            </div>
          </div>

          {/* Copy -------------------------------------------------------- */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal variant="fade">
              <Eyebrow>Founder</Eyebrow>
            </Reveal>

            <div className="flex flex-col gap-3">
              <Reveal>
                <h2 id="founder-heading" className="text-display text-gb-silver-light">
                  {name}
                </h2>
              </Reveal>

              <Reveal delay={1} className="flex items-center gap-3">
                <span className="h-px w-9 shrink-0 bg-gb-gold" aria-hidden="true" />
                <span className="text-meta uppercase text-gb-gold">{title}</span>
              </Reveal>
            </div>

            {intro ? (
              <Reveal delay={1}>
                <p className="text-lead gb-measure text-gb-silver">{intro}</p>
              </Reveal>
            ) : null}

            {message ? (
              <Reveal variant="fade" delay={2} className="mt-1">
                <figure className="border-l-2 border-gb-gold-dark py-1 pl-5 sm:pl-7">
                  <blockquote className="gb-measure text-lead text-gb-silver-light">
                    {message}
                  </blockquote>

                  <figcaption className="mt-4 flex items-center gap-3 text-meta uppercase text-gb-silver-dark">
                    <span className="h-px w-6 shrink-0 bg-gb-steel" aria-hidden="true" />
                    {name}
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}

            {facts.length ? (
              <Reveal variant="fade" delay={3} className="mt-3">
                <dl className="grid gap-px border border-gb-line bg-gb-concrete sm:grid-cols-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-2 bg-gb-graphite p-5">
                      <dt className="text-meta uppercase text-gb-silver-dark">{fact.label}</dt>
                      <dd className="text-[0.9375rem] leading-snug font-semibold text-gb-silver-light">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
