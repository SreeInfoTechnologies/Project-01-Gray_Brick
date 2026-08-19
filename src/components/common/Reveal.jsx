import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'
import { useMotionEnabled } from '@/lib/motion'

const variants = {
  up: '',
  rise: 'gb-reveal--rise',
  fade: 'gb-reveal--fade',
  left: 'gb-reveal--left',
  right: 'gb-reveal--right',
  scale: 'gb-reveal--scale',
  clip: 'gb-reveal--clip',
  wipe: 'gb-reveal--wipe',
}

const delays = {
  1: 'gb-delay-1',
  2: 'gb-delay-2',
  3: 'gb-delay-3',
  4: 'gb-delay-4',
  5: 'gb-delay-5',
  6: 'gb-delay-6',
  7: 'gb-delay-7',
  8: 'gb-delay-8',
}

/**
 * Reveal a block once it scrolls into view. All timing lives in SCSS classes
 * so no element ever needs an inline style to carry a delay.
 *
 * Inside a tree with motion disabled this becomes a plain wrapper: no
 * observer, no reveal classes, nothing to transition.
 */
export function Reveal({ as: Tag = 'div', variant = 'up', delay, className, children, ...rest }) {
  const motion = useMotionEnabled()
  const [ref, inView] = useInView({ skip: !motion })

  if (!motion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={cn('gb-reveal', variants[variant], delay ? delays[delay] : null, inView && 'is-visible', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
