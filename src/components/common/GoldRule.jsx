import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'
import { useMotionEnabled } from '@/lib/motion'

/** A hairline gold rule. It draws itself out on scroll where motion is on,
 *  and is simply already drawn where it is off. */
export function GoldRule({ className }) {
  const motion = useMotionEnabled()
  const [ref, inView] = useInView({ threshold: 0.4, skip: !motion })

  return (
    <span
      ref={ref}
      className={cn('gb-rule', (!motion || inView) && 'is-visible', className)}
      aria-hidden="true"
    >
      <span />
    </span>
  )
}
