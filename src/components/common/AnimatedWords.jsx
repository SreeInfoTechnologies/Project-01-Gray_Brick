import { Fragment } from 'react'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'
import { useMotionEnabled } from '@/lib/motion'

/**
 * Heading that lifts word by word from behind a mask.
 *
 * The space between words is rendered OUTSIDE the masked spans. Each span is an
 * inline-block, and an atomic inline box offers no break opportunity inside
 * itself. Keeping the whitespace between them is what lets the browser wrap
 * the heading normally instead of running it off the side of a phone.
 */
export function AnimatedWords({ as: Tag = 'h2', text, className, threshold = 0.2 }) {
  const motion = useMotionEnabled()
  const [ref, inView] = useInView({ threshold, skip: !motion })
  const words = text.split(' ')

  // Static trees get the heading as one text node. The browser wraps it
  // normally and there are no masked spans to reason about.
  if (!motion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref} className={cn('gb-words', inView && 'is-visible', className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="gb-words__word">
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
