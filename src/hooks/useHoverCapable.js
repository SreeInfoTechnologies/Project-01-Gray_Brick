import { useEffect, useState } from 'react'

/**
 * True when the device has a real pointer that can hover.
 *
 * Opening a menu on `mouseenter` is right for a mouse and wrong for a finger:
 * on touch, the synthesised mouseenter arrives with the tap that was meant to
 * follow the link, so the menu opens and closes in the same gesture. Gating the
 * hover handlers on this keeps touch to an explicit tap on the toggle.
 */
export function useHoverCapable() {
  const [capable, setCapable] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(hover: hover)')
    const update = () => setCapable(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return capable
}
