import { useEffect, useRef, useState } from 'react'

/**
 * Observe an element and report when it enters the viewport.
 *
 * Falls back to "visible" when IntersectionObserver is unavailable, so a
 * missing API can never leave content permanently hidden behind an animation.
 */
export function useInView({
  threshold = 0.12,
  rootMargin = '0px 0px -8% 0px',
  once = true,
  skip = false,
} = {}) {
  const ref = useRef(null)
  // Without IntersectionObserver there is nothing to observe, so the element
  // starts visible rather than waiting for an event that will never arrive.
  // `skip` does the same for trees that have opted out of motion entirely.
  const [inView, setInView] = useState(() => skip || typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (skip) return undefined

    const element = ref.current
    if (!element) return undefined

    if (typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, skip])

  return [ref, inView]
}
