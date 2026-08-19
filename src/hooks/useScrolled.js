import { useEffect, useState } from 'react'

/** True once the page has scrolled past `threshold` pixels. rAF-throttled. */
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold,
  )

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > threshold)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
