import { useEffect } from 'react'

/**
 * Freeze page scrolling while an overlay is open.
 *
 * No scrollbar-width compensation is needed: `scrollbar-gutter: stable` is set
 * on <html> in globals.scss, so the gutter is always reserved and locking the
 * body cannot shift the layout.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined
    document.body.classList.add('gb-scroll-locked')
    return () => document.body.classList.remove('gb-scroll-locked')
  }, [locked])
}
