import { Container } from './Container'
import { PageHero } from './PageHero'
import { Reveal } from './Reveal'
import { Seo } from './Seo'
import heroImage from '@/assets/images/industrial-facade.webp'

/**
 * Shared shell for the two policy pages. Long-form text gets a narrower
 * container and a tighter measure than the marketing pages.
 */
export function LegalPage({ title, description, path, updated, sections }) {
  return (
    <>
      <Seo title={title} description={description} path={path} />

      <PageHero
        eyebrow="Legal"
        title={title}
        image={heroImage}
        imageAlt="Cladding detail across a modern industrial elevation"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: title }]}
      />

      <section className="bg-gb-charcoal py-16 sm:py-20 lg:py-24">
        <Container size="narrow">
          <p className="text-meta uppercase text-gb-silver-dark">Last updated {updated}</p>

          <div className="mt-10 flex flex-col gap-10">
            {sections.map((section) => (
              <Reveal key={section.heading} variant="fade" className="flex flex-col gap-4">
                <h2 className="text-display-sm text-gb-silver-light">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 30)}
                    className="text-[0.9375rem] leading-relaxed text-gb-silver"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="flex list-disc flex-col gap-2 pl-5">
                    {section.list.map((item) => (
                      <li key={item} className="text-[0.9375rem] leading-relaxed text-gb-silver">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
