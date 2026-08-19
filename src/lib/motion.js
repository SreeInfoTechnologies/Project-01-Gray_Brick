import { createContext, useContext } from 'react'

/**
 * Whether scroll-triggered motion is active for this part of the tree.
 *
 * Shared components (SectionHeading, CTASection, Reveal…) are used on every
 * page, but the homepage is deliberately still: content is fully rendered on
 * load and nothing animates in as you scroll. Rather than forking those
 * components, the homepage sets this context to `false` and each primitive
 * renders its finished state directly: no observer, no transition, no extra
 * DOM.
 *
 * Hover, focus and press states are unaffected. So is the hero's one-time
 * load-in, which is a CSS animation rather than a scroll effect.
 */
export const MotionContext = createContext(true)

export function useMotionEnabled() {
  return useContext(MotionContext)
}
