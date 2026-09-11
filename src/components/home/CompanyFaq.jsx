import { Accordion } from '@/components/common/Accordion'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { companyFaqs } from '@/data/faqs'

/**
 * Questions about the company itself: what it does, where its buildings are,
 * who founded it, who it works with.
 *
 * They are the questions people ask a search engine or an AI assistant about a
 * business, so they are answered here in full sentences and published as
 * FAQPage structured data by the homepage. Answers are assembled in
 * src/data/faqs.js from the same data as the rest of the site.
 */
export function CompanyFaq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-gb-line bg-gb-charcoal py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="About Gray Brick"
              title="Questions people ask about us"
              lead="Who we are, where our warehouses are and how to reach us, answered plainly."
            />
          </div>

          <div className="lg:col-span-7">
            <Accordion items={companyFaqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}
