import { useId, useState } from 'react'

import { Icon } from './Icon'
import { cn } from '@/lib/cn'

function AccordionItem({ item, index, open, onToggle, tone }) {
  const id = useId()
  const onDark = tone === 'light'

  return (
    <div
      data-open={open}
      className={cn(
        'gb-acc border-b',
        onDark ? 'border-gb-line-dark' : 'border-gb-line-light',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6"
        >
          <span
            className={cn(
              'mt-1 shrink-0 text-[0.6875rem] font-semibold tracking-[0.18em] transition-colors duration-300',
              // The lighter gold only clears AA on dark surfaces.
              open
                ? onDark
                  ? 'text-gb-gold'
                  : 'text-gb-gold-dark'
                : onDark
                  ? 'text-gb-concrete-light'
                  : 'text-gb-concrete',
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span
            className={cn(
              'flex-1 text-[1.0625rem] leading-snug font-semibold transition-colors duration-300 sm:text-lg',
              onDark
                ? open
                  ? 'text-gb-gold'
                  : 'text-gb-white group-hover:text-gb-gold-light'
                : open
                  ? 'text-gb-gold-dark'
                  : 'text-gb-graphite group-hover:text-gb-gold-dark',
            )}
          >
            {item.question}
          </span>

          <span
            className={cn(
              'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-gb-sm border transition-[transform,border-color,color] duration-400 ease-[var(--ease-gb)]',
              open ? 'rotate-45 border-gb-gold text-gb-gold' : null,
              !open && onDark ? 'border-gb-line-dark text-gb-silver' : null,
              !open && !onDark ? 'border-gb-line-light text-gb-industrial' : null,
            )}
          >
            <Icon name="plus" className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} className="gb-acc__panel">
        <div>
          <p
            className={cn(
              'gb-measure pr-4 pb-7 pl-[calc(2rem+1rem)] text-[0.9375rem] leading-relaxed sm:pl-[calc(2rem+1.5rem)]',
              onDark ? 'text-gb-silver' : 'text-gb-industrial',
            )}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

/** Single-open accordion. Keyboard and screen-reader wiring is standard. */
export function Accordion({ items, tone = 'dark', className }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={cn('border-t', tone === 'light' ? 'border-gb-line-dark' : 'border-gb-line-light', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          index={index}
          tone={tone}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  )
}
