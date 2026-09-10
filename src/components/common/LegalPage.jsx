import { Container } from './Container'
import { PageHero } from './PageHero'
import { Reveal } from './Reveal'
import { Seo } from './Seo'
import heroImage from '@/assets/images/gb-frontage-dusk.webp'

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Shared shell for the policy pages.
 *
 * Long-form legal text is read out of order — people look for the one clause
 * they care about — so from lg up a numbered contents list stays beside the
 * text, and every section carries an id it can be linked to directly.
 *
 * Each section takes `body` (paragraphs), and optionally `list` (bullets) and
 * `after` (paragraphs that follow the list).
 */
export function LegalPage({ title, description, path, updated, intro, sections }) {
  const items = sections.map((section, index) => ({
    ...section,
    id: slug(section.heading),
    number: String(index + 1).padStart(2, '0'),
  }))

  return (
    <>
      <Seo title={title} description={description} path={path} />

      <PageHero
        eyebrow="Legal"
        title={title}
        image={heroImage}
        imageAlt="Two-level frontage of a Gray Brick unit, photographed in the evening"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: title }]}
      />

      <section className="bg-gb-charcoal py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Contents ------------------------------------------------ */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="text-meta uppercase text-gb-silver-dark">Last updated {updated}</p>

                <nav aria-label={`${title} contents`} className="mt-6 hidden border-t border-gb-line lg:block">
                  <ol>
                    {items.map((item) => (
                      <li key={item.id} className="border-b border-gb-line">
                        <a
                          href={`#${item.id}`}
                          className="group flex items-baseline gap-4 py-3 text-[0.875rem] text-gb-silver transition-colors duration-300 hover:text-gb-gold-soft"
                        >
                          <span className="w-6 shrink-0 text-[0.6875rem] font-semibold tracking-[0.14em] text-gb-silver-dark transition-colors duration-300 group-hover:text-gb-gold">
                            {item.number}
                          </span>
                          {item.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>

            {/* Text ---------------------------------------------------- */}
            <div className="min-w-0 lg:col-span-8">
              {intro ? (
                <p className="gb-measure text-lead text-gb-silver-light">{intro}</p>
              ) : null}

              <div className="mt-12 flex flex-col gap-12 first:mt-0">
                {items.map((item) => (
                  <Reveal
                    as="section"
                    key={item.id}
                    id={item.id}
                    variant="fade"
                    aria-labelledby={`${item.id}-heading`}
                    className="flex scroll-mt-32 flex-col gap-4 border-t border-gb-line pt-8"
                  >
                    <h2
                      id={`${item.id}-heading`}
                      className="flex items-baseline gap-4 text-xl leading-snug font-bold tracking-tight text-gb-silver-light sm:text-2xl"
                    >
                      <span className="text-[0.75rem] font-semibold tracking-[0.14em] text-gb-gold">
                        {item.number}
                      </span>
                      {item.heading}
                    </h2>

                    {item.body?.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="gb-measure text-base leading-relaxed text-gb-silver">
                        {paragraph}
                      </p>
                    ))}

                    {item.list ? (
                      <ul className="gb-measure flex list-disc flex-col gap-2.5 pl-5 marker:text-gb-gold">
                        {item.list.map((entry) => (
                          <li key={entry.slice(0, 40)} className="text-base leading-relaxed text-gb-silver">
                            {entry}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.after?.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="gb-measure text-base leading-relaxed text-gb-silver">
                        {paragraph}
                      </p>
                    ))}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
