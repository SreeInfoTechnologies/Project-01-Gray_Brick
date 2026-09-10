import { CTASection } from '@/components/common/CTASection'
import { Seo } from '@/components/common/Seo'
import { MotionContext } from '@/lib/motion'
import { AboutPreview } from '@/components/home/AboutPreview'
import { Facilities } from '@/components/home/Facilities'
import { Gallery } from '@/components/home/Gallery'
import { Hero } from '@/components/home/Hero'
import { Partners } from '@/components/home/Partners'
import { SolutionsPreview } from '@/components/home/SolutionsPreview'

/**
 * A short homepage, in the order a visitor checks things:
 * what this is and where → who already relies on it → the buildings →
 * what they look like inside → ways to take space → why us → enquire.
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
        title="Gray Brick Infra | Warehousing Solutions in Bengaluru"
        description="Warehouse space in Bengaluru from Gray Brick Infra: facilities at HRBR Layout, Kalyan Nagar and Horamavu. Ready-to-move and built-to-suit space for storage, fulfilment and distribution, with Swiggy, Blinkit, Bistro and Amazon among our partners."
        path="/"
      />

      <MotionContext.Provider value={false}>
        <Hero />
        <Partners />
        <Facilities />
        <Gallery />
        <SolutionsPreview />
        <AboutPreview />
        <CTASection />
      </MotionContext.Provider>
    </>
  )
}
