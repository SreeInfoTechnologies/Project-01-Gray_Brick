import { CTASection } from '@/components/common/CTASection'
import { Seo } from '@/components/common/Seo'
import { MotionContext } from '@/lib/motion'
import { AboutPreview } from '@/components/home/AboutPreview'
import { CompanyFaq } from '@/components/home/CompanyFaq'
import { Facilities } from '@/components/home/Facilities'
import { Gallery } from '@/components/home/Gallery'
import { Hero } from '@/components/home/Hero'
import { Partners } from '@/components/home/Partners'
import { SolutionsPreview } from '@/components/home/SolutionsPreview'
import { companyFaqs } from '@/data/faqs'
import { faqNode } from '@/lib/schema'

/**
 * A short homepage, in the order a visitor checks things:
 * what this is and where → who already relies on it → the buildings →
 * what they look like inside → ways to take space → why us → common
 * questions → enquire.
 *
 * Motion is switched off for the whole page. Nothing fades or slides in on
 * scroll: the page is fully composed the moment it renders. The hero keeps a
 * single load-in, which is a CSS animation, not a scroll effect. Interior
 * pages keep their scroll reveals.
 */
export default function Home() {
  return (
    <>
      <Seo
        exact
        title="Gray Brick Infra | Warehouse Space for Lease in Bengaluru"
        description="Ready-to-move and built-to-suit warehouse space in Bengaluru (Bangalore), at HRBR Layout and Horamavu. Partners include Swiggy, Blinkit, Bistro and Amazon."
        path="/"
        imageAlt="Gray Brick Infra: warehouse space in Bengaluru, with the Horamavu facility and its branded gable"
        schema={[faqNode('/', companyFaqs)]}
      />

      <MotionContext.Provider value={false}>
        <Hero />
        <Partners />
        <Facilities />
        <Gallery />
        <SolutionsPreview />
        <AboutPreview />
        <CompanyFaq />
        <CTASection />
      </MotionContext.Provider>
    </>
  )
}
