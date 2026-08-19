import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'
import { StructuredData } from '@/components/common/StructuredData'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <a href="#main" className="gb-skip-link">
        Skip to content
      </a>

      <ScrollToTop />
      <StructuredData />
      <Navbar />

      {/* Keyed by route so each page plays the entrance animation once. */}
      <main id="main" key={pathname} tabIndex={-1} className="gb-page">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
