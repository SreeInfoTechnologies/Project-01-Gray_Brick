import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restore the reading position on navigation: top of the page for a new route,
 * or the targeted section when the URL carries a hash.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
