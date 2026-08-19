import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RouteFallback } from '@/components/common/RouteFallback'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

// The homepage ships in the initial bundle; every other route is split so the
// first paint only downloads what it needs.
const Warehouses = lazy(() => import('@/pages/Warehouses'))
const WarehouseDetail = lazy(() => import('@/pages/WarehouseDetail'))
const Solutions = lazy(() => import('@/pages/Solutions'))
const Industries = lazy(() => import('@/pages/Industries'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="warehouses"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Warehouses />
            </Suspense>
          }
        />
        <Route
          path="warehouses/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <WarehouseDetail />
            </Suspense>
          }
        />
        <Route
          path="solutions"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Solutions />
            </Suspense>
          }
        />
        <Route
          path="industries"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Industries />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Terms />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
