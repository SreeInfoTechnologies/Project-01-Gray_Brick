import { cn } from '@/lib/cn'

/**
 * The single horizontal rhythm for the whole site. Page gutters grow with the
 * viewport and the measure is capped so 1920px screens do not stretch a line
 * of text across the full width.
 */
export function Container({ as: Tag = 'div', size = 'default', className, children }) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        size === 'default' && 'max-w-[86rem]',
        size === 'narrow' && 'max-w-[64rem]',
        size === 'wide' && 'max-w-[104rem]',
        size === 'full' && 'max-w-none',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
