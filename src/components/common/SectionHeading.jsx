import { AnimatedWords } from './AnimatedWords'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { cn } from '@/lib/cn'

/**
 * The standard section opener: eyebrow, display title, optional lead and an
 * optional action that sits on the baseline of the title on wide screens.
 */
const titleSizes = {
  // Page-level section openers.
  default: 'text-display',
  // Sub-sections inside a page that already has a strong h1 and h2.
  sm: 'text-display-sm',
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  action,
  tone = 'dark',
  align = 'left',
  size = 'default',
  as: Tag = 'h2',
  className,
  titleClassName,
}) {
  const onDark = tone === 'light'
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-4', centered ? 'items-center' : 'max-w-3xl')}>
        {eyebrow ? (
          <Reveal variant="fade">
            <Eyebrow tone={tone} index={index}>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}

        <AnimatedWords
          as={Tag}
          text={title}
          className={cn(
            titleSizes[size],
            onDark ? 'text-gb-white' : 'text-gb-graphite',
            titleClassName,
          )}
        />

        {lead ? (
          <Reveal delay={1}>
            <p
              className={cn(
                'text-lead gb-measure',
                centered && 'mx-auto',
                onDark ? 'text-gb-silver' : 'text-gb-industrial',
              )}
            >
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal variant="fade" delay={2} className={cn('shrink-0', centered && 'mt-2')}>
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
