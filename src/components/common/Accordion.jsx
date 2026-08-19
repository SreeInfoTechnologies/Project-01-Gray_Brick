import { useId, useState } from 'react'

import { Icon } from './Icon'
import { cn } from '@/lib/cn'

function AccordionItem({ item, index, open, onToggle }) {
  const id = useId()

  return (
    <div
      data-open={open}
      className={cn(
        'gb-acc border-b',
        'border-gb-line',
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
              open ? 'text-gb-gold' : 'text-gb-silver-dark',
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span
            className={cn(
              'flex-1 text-[1.0625rem] leading-snug font-semibold transition-colors duration-300 sm:text-lg',
              open ? 'text-gb-gold' : 'text-gb-silver-light group-hover:text-gb-gold-light',
            )}
          >
            {item.question}
          </span>

          <span
            className={cn(
              'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-gb-sm border transition-[transform,border-color,color] duration-400 ease-[var(--ease-gb)]',
              open ? 'rotate-45 border-gb-gold text-gb-gold' : null,
              !open ? 'border-gb-line text-gb-silver' : null,
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
              'text-gb-silver',
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
export function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={cn('border-t border-gb-line', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          index={index}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  )
}
