import { useState } from 'react'

import { ImageFrame } from '@/components/common/ImageFrame'
import { cn } from '@/lib/cn'

/** Selectable gallery: large frame plus keyboard-reachable thumbnails. */
export function WarehouseGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  if (!images || images.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <ImageFrame
        key={active.src}
        src={active.src}
        alt={active.alt}
        ratio="16/9"
        className="rounded-gb-sm border border-gb-line"
      />

      <ul className="grid grid-cols-4 gap-3 sm:gap-4">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={cn(
                'block w-full overflow-hidden rounded-gb-sm border-2 transition-[border-color,opacity] duration-300',
                index === activeIndex
                  ? 'border-gb-gold opacity-100'
                  : 'border-transparent opacity-65 hover:opacity-100',
              )}
            >
              <ImageFrame src={image.src} alt="" ratio="4/3" />
              <span className="sr-only">{`Show image ${index + 1} of ${images.length}. ${image.alt}`}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="sr-only" aria-live="polite">{`${name}: ${active.alt}`}</p>
    </div>
  )
}
