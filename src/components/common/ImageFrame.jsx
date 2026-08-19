import { useState } from 'react'

import { cn } from '@/lib/cn'

// Fixed map rather than a template literal so Tailwind's scanner sees every
// class it needs to generate.
const ratios = {
  '21/9': 'aspect-[21/9]',
  '16/9': 'aspect-[16/9]',
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  auto: '',
}

/**
 * Every photograph on the site goes through here so that aspect ratio, object
 * fit, lazy-loading and the fade-in on decode are handled identically and no
 * image can shift the layout as it arrives.
 */
export function ImageFrame({
  src,
  alt,
  ratio = '4/3',
  priority = false,
  zoom = false,
  className,
  imgClassName,
  children,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-gb-graphite', ratios[ratio], className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'gb-photo h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-gb)]',
          zoom && 'gb-zoom',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
      {children}
    </div>
  )
}
