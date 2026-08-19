import { useEffect } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keep Tab focus inside `containerRef` while `active`, and hand focus back to
 * whatever was focused before the overlay opened when it closes.
 */
export function useFocusTrap(active, containerRef) {
  useEffect(() => {
    if (!active) return undefined

    const container = containerRef.current
    if (!container) return undefined

    const previouslyFocused = document.activeElement

    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE))

    const first = focusables()[0]
    first?.focus()

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return

      const firstItem = items[0]
      const lastItem = items[items.length - 1]

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    container.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [active, containerRef])
}
