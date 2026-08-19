import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Reveal } from '@/components/common/Reveal'
import portrait from '@/assets/images/leadership-portrait.webp'
import { company } from '@/data/company'

/**
 * Leadership.
 *
 * Name, designation and portrait only. There is no biography, no track record
 * and no quote, because none has been supplied and inventing any of it about a
 * named real person would be worse than leaving the space quiet. If
 * `company.leadership.message` is filled in, it renders here.
 */
export function Leadership() {
  const { name, title, message } = company.leadership

  return (
    <section className="border-t border-gb-line bg-gb-black py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="clip" className="lg:col-span-4">
            <ImageFrame
              src={portrait}
              alt={`${name}, ${title} of ${company.legalName}`}
              ratio="4/5"
              className="gb-ticks rounded-gb-sm border border-gb-line"
            />
          </Reveal>

          <div className="flex max-w-xl flex-col gap-5 lg:col-span-8">
            <Reveal variant="fade">
              <Eyebrow>Leadership</Eyebrow>
            </Reveal>

            <Reveal>
              <h2 className="text-display text-gb-silver-light">{name}</h2>
            </Reveal>

            <Reveal delay={1} className="flex items-center gap-3">
              <span className="h-px w-9 shrink-0 bg-gb-gold" aria-hidden="true" />
              <span className="text-meta uppercase text-gb-gold">{title}</span>
            </Reveal>

            {message ? (
              <Reveal delay={2}>
                <p className="text-lead gb-measure text-gb-silver">{message}</p>
              </Reveal>
            ) : null}

            <Reveal variant="fade" delay={2} className="mt-2 border-t border-gb-line pt-5">
              <p className="text-[0.9375rem] leading-relaxed text-gb-silver-dark">
                {company.legalName}
                <span className="mx-2 text-gb-silver" aria-hidden="true">
                  /
                </span>
                {company.address.city}, {company.address.region}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
