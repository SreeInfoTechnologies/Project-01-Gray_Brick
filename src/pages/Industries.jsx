import { CTASection } from '@/components/common/CTASection'
import { Container } from '@/components/common/Container'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Seo } from '@/components/common/Seo'
import { IndustryCard } from '@/components/industries/IndustryCard'
import heroImage from '@/assets/images/racking-aisle.webp'
import { industries } from '@/data/industries'

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Work With"
        description="What e-commerce, quick commerce, retail, FMCG, manufacturing, automotive, logistics and consumer goods operations each need from a warehouse in Bengaluru."
        path="/industries"
      />

      <PageHero
        eyebrow="Industries"
        title="Different sectors, different floors"
        lead="A parts store and a quick-commerce operation can take identical buildings and still need completely different things from them. These are the patterns we plan around."
        image={heroImage}
        imageAlt="Long racking aisle stacked with inventory inside a working warehouse"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Industries' }]}
        rail={[
          { icon: 'layers', label: `${industries.length} sectors` },
          { icon: 'sliders', label: 'Layout follows the operation' },
          { icon: 'package', label: 'Storage to dispatch' },
        ]}
      />

      <section className="bg-gb-white py-16 sm:py-20 lg:py-28">
        <Container>
          <ul className="gb-stagger grid gap-6 lg:grid-cols-2 lg:gap-8">
            {industries.map((industry) => (
              <Reveal as="li" key={industry.id} className="h-full">
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </ul>

          <Reveal variant="fade" className="mt-12 border-t border-gb-line-light pt-8">
            <p className="gb-measure text-[0.9375rem] leading-relaxed text-gb-concrete">
              Not on this list? Most requirements come down to the same three questions. What
              arrives, where it sits, and how it goes out. Tell us those and we can work out the
              rest.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Tell us how your operation runs"
        description="Bring us the volumes, the storage profile and the dispatch pattern. We will tell you what kind of facility fits, including when the honest answer is not the one you expected."
      />
    </>
  )
}
