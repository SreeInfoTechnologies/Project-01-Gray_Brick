import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Container } from '@/components/common/Container'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Seo } from '@/components/common/Seo'
import { ContactDetails } from '@/components/contact/ContactDetails'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import heroImage from '@/assets/images/gb-frontage-dusk.webp'
import { company } from '@/data/company'
import { businessRequirements, enquiryAreas, spaceBands } from '@/data/warehouses'
import { ids } from '@/lib/schema'

const isValid = (options, value) => options.some((option) => option.value === value)

export default function Contact() {
  const [searchParams] = useSearchParams()

  // Criteria chosen in the warehouse finder arrive as query parameters and
  // pre-fill the form, so nobody has to answer the same question twice.
  const defaults = useMemo(() => {
    const location = searchParams.get('location') ?? ''
    const space = searchParams.get('space') ?? ''
    const requirement = searchParams.get('requirement') ?? ''

    return {
      location: isValid(enquiryAreas, location) ? location : '',
      space: isValid(spaceBands, space) ? space : '',
      requirement: isValid(businessRequirements, requirement) ? requirement : '',
    }
  }, [searchParams])

  return (
    <>
      <Seo
        exact
        title="Contact Gray Brick Infra | Warehouse Enquiries in Bengaluru"
        description="Enquire about warehouse space in Bengaluru (Bangalore) with Gray Brick Infra. Office at 852, 7th A Main, Banaswadi, Bengaluru 560043, open Monday to Saturday."
        path="/contact"
        pageType="ContactPage"
        mainEntity={{ '@id': ids.organization() }}
        image="/og/contact.jpg"
        imageAlt="Contact Gray Brick Infra about warehouse space in Bengaluru"
      />

      <PageHero
        eyebrow="Contact"
        title="Looking for the right warehouse in Bengaluru?"
        lead="Tell us where you want to operate, how much space you need and what the operation involves. We will help you work out the right option."
        image={heroImage}
        imageAlt="Roller-shuttered frontage of a Gray Brick unit, photographed in the evening"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        rail={[
          { icon: 'pin', label: '852, 7th A Main, Banaswadi' },
          { icon: 'clock', label: company.workingHours },
          { icon: 'mail', label: 'A real person replies' },
        ]}
      />

      <section className="bg-gb-charcoal py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Enquiry"
                title="Tell us what you need"
                lead="The more you tell us about how the space will be used, the more useful our first reply will be."
                className="mb-10"
              />

              <Reveal variant="fade">
                <EnquiryForm defaults={defaults} />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="fade" delay={1}>
                <ContactDetails />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
