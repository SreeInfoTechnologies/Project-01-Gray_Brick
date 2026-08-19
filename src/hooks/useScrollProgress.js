import { useEffect, useRef } from 'react'

/**
 * Write reading progress (0 to 1) to a CSS custom property on the returned ref.
 * Paired with `.gb-progress`, which turns it into a scaleX, cheap enough to
 * run on every frame of a scroll.
 */
export function useScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      element.style.setProperty('--gb-progress', progress.toFixed(4))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
