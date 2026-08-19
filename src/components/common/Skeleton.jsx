import { cn } from '@/lib/cn'

/** Neutral loading block. Never brighter than the surface it replaces. */
export function Skeleton({ className }) {
  return (
    <span
      className={cn('gb-shimmer block rounded-gb-sm bg-gb-silver-light/70', className)}
      aria-hidden="true"
    />
  )
}
