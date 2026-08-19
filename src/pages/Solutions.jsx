import { ProcessFlow } from '@/components/solutions/ProcessFlow'
import { SolutionSection } from '@/components/solutions/SolutionSection'
import { Accordion } from '@/components/common/Accordion'
import { Container } from '@/components/common/Container'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Seo } from '@/components/common/Seo'
import heroImage from '@/assets/images/rail-container-freight.webp'
import { solutionFaqs, solutions } from '@/data/solutions'

export default function Solutions() {
  return (
    <>
      <Seo
        title="Warehousing &amp; Fulfillment Solutions"
        description="Ready-to-move and built-to-suit warehouses, fulfillment centers, distribution facilities and supply chain support for businesses operating in and around Bengaluru."
        path="/solutions"
      />

      <PageHero
        eyebrow="Solutions"
        title="Warehousing that fits the operation"
        lead="Five ways we help businesses in Bengaluru get storage, order handling and distribution working, from a finished building you can take over now to one developed around your process."
        image={heroImage}
        imageAlt="Container freight train in a rail yard alongside stacked containers"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]}
        rail={[
          { icon: 'warehouse', label: `${solutions.length} ways to take space` },
          { icon: 'network', label: 'Support through handover' },
          { icon: 'pin', label: 'Bengaluru corridors' },
        ]}
      />

      {solutions.map((solution, index) => (
        <SolutionSection
          key={solution.id}
          solution={solution}
          reversed={index % 2 === 1}
        />
      ))}

      <ProcessFlow />

      <section className="bg-gb-charcoal py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="Questions"
                title="Before you get in touch"
                lead="The questions we get asked most often, answered plainly."
              />
            </div>

            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <Accordion items={solutionFaqs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
