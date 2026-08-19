import { CTASection } from '@/components/common/CTASection'
import { Seo } from '@/components/common/Seo'
import { MotionContext } from '@/lib/motion'
import { AboutPreview } from '@/components/home/AboutPreview'
import { CorridorBand } from '@/components/home/CorridorBand'
import { Hero } from '@/components/home/Hero'
import { IndustriesPreview } from '@/components/home/IndustriesPreview'
import { ProblemCards } from '@/components/home/ProblemCards'
import { SolutionsPreview } from '@/components/home/SolutionsPreview'
import { TrustBand } from '@/components/home/TrustBand'
import { ValueStrip } from '@/components/home/ValueStrip'
import { WarehouseFinder } from '@/components/home/WarehouseFinder'

/**
 * Homepage order follows the decision a visitor is actually making:
 * what this is → who it is for → the problem they arrived with → what we
 * provide → let them search → why Bengaluru → their sector → why us → enquire.
 *
 * Motion is switched off for the whole page. Nothing fades or slides in on
 * scroll: the page is fully composed the moment it renders, and the work of
 * holding attention is done by typography, layout and hover states instead.
 * The hero keeps a single load-in, which is a CSS animation, not a scroll
 * effect. Interior pages keep their scroll reveals.
 */
export default function Home() {
  return (
    <>
      <Seo
        exact
        title="Gray Brick Infra | Warehousing Solutions in Bengaluru"
        description="Ready-to-move and built-to-suit warehouse space in and around Bengaluru, plus fulfillment and distribution facilities. Tell us your location, area and requirement, and we will help you find the right fit."
        path="/"
      />

      <MotionContext.Provider value={false}>
        <Hero />
        <ValueStrip />
        <TrustBand />
        <ProblemCards />
        <SolutionsPreview />
        <WarehouseFinder />
        <CorridorBand />
        <IndustriesPreview />
        <AboutPreview />
        <CTASection />
      </MotionContext.Provider>
    </>
  )
}
