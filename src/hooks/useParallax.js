import { useEffect, useRef } from 'react'

/**
 * Drift an element against the scroll.
 *
 * The hook only ever writes a CSS custom property; the transform itself lives
 * in the `.gb-parallax` class, so no element carries an inline transform and
 * the effect disappears entirely under `prefers-reduced-motion`.
 *
 * @param strength pixels of travel across a full viewport of scrolling
 * @param enabled set false to opt a subtree out of parallax entirely
 */
export function useParallax(strength = 60, enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const element = ref.current
    if (!element) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    let active = false

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight
      if (rect.bottom < -200 || rect.top > viewport + 200) return
      // -1 when the element sits below the fold, +1 once it has passed above it
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2)
      element.style.setProperty('--gb-py', `${(progress * strength).toFixed(2)}px`)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active) onScroll()
    })
    observer.observe(element)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      element.style.removeProperty('--gb-py')
    }
  }, [strength, enabled])

  return ref
}
