import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Reveal } from '@/components/common/Reveal'
import { cn } from '@/lib/cn'

/**
 * One capability, told as an editorial row. Rows alternate their image side on
 * wide screens and collapse to a single column, text first, image second, on
 * narrow ones.
 */
export function SolutionSection({ solution, reversed = false, tone = 'light' }) {
  const onDark = tone === 'dark'
  // Supply chain support is not a facility type, so it points at the team
  // rather than at a filtered listing that would return nothing.
  const isSupportOnly = solution.id === 'supply-chain'

  return (
    <section
      id={solution.id}
      aria-labelledby={`${solution.id}-title`}
      className={cn(
        'scroll-mt-24 py-16 sm:py-20 lg:py-24',
        onDark ? 'bg-gb-charcoal' : 'bg-gb-white',
      )}
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className={cn('flex flex-col gap-6 lg:col-span-6', reversed && 'lg:order-2')}>
            <Reveal variant="fade">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'text-[2.5rem] leading-none font-bold tracking-tight',
                    onDark ? 'text-gb-industrial' : 'text-gb-silver',
                  )}
                  aria-hidden="true"
                >
                  {solution.index}
                </span>
                <Eyebrow tone={onDark ? 'light' : 'dark'}>{solution.category}</Eyebrow>
              </div>
            </Reveal>

            <Reveal>
              <h2
                id={`${solution.id}-title`}
                className={cn('text-display', onDark ? 'text-gb-white' : 'text-gb-graphite')}
              >
                {solution.title}
              </h2>
            </Reveal>

            <Reveal delay={1}>
              <p
                className={cn(
                  'text-lead gb-measure',
                  onDark ? 'text-gb-silver' : 'text-gb-industrial',
                )}
              >
                {solution.description}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={2}>
              <ul
                className={cn(
                  'flex flex-col gap-3.5 border-t pt-6',
                  onDark ? 'border-gb-line-dark' : 'border-gb-line-light',
                )}
              >
                {solution.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      className={cn('mt-0.5 h-4 w-4 shrink-0', onDark ? 'text-gb-gold' : 'text-gb-gold-dark')}
                    />
                    <span
                      className={cn(
                        'text-[0.9375rem] leading-relaxed',
                        onDark ? 'text-gb-silver-light' : 'text-gb-industrial',
                      )}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade" delay={3} className="mt-2">
              <Button
                to={isSupportOnly ? '/contact' : `/warehouses?type=${solution.id}`}
                variant={onDark ? 'outlineLight' : 'outline'}
                withArrow
              >
                {isSupportOnly ? 'Talk to our team' : 'See matching facilities'}
              </Button>
            </Reveal>
          </div>

          <div className={cn('lg:col-span-6', reversed && 'lg:order-1')}>
            <Reveal variant="clip">
              <ImageFrame
                src={solution.wideImage}
                alt={solution.wideImageAlt}
                ratio="3/2"
                className="rounded-gb-sm"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
