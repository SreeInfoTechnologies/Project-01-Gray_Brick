import { Container } from '@/components/common/Container'
import { GoldRule } from '@/components/common/GoldRule'
import { Icon } from '@/components/common/Icon'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { supplyFlow } from '@/data/solutions'

/**
 * The path a unit takes through the operation.
 *
 * A gold rule draws across the top of the row as the section arrives, with a
 * node above each stage. The sequence reads as one connected flow rather than
 * four unrelated boxes. On narrow screens it becomes a vertical list.
 */
export function ProcessFlow() {
  return (
    <section className="relative isolate bg-gb-black py-20 sm:py-24 lg:py-32">
      <div className="gb-gridlines absolute inset-0 -z-10 opacity-40" aria-hidden="true" />

      <Container>
        <SectionHeading
          eyebrow="How it connects"
          title="One flow, four stages"
          lead="Storage, order handling and dispatch are rarely separate problems. Facilities work best when they are planned as a single path from the inbound gate to the outbound one."
        />

        <div className="relative mt-14 lg:mt-20">
          {/* The connecting line, drawn on arrival. */}
          <GoldRule className="absolute inset-x-0 top-[7px] hidden opacity-50 lg:block" />

          <ol className="gb-stagger grid gap-10 lg:grid-cols-4 lg:gap-8">
            {supplyFlow.map((stage, index) => (
              <Reveal
                as="li"
                key={stage.label}
                variant="scale"
                className="group relative flex gap-5 lg:flex-col lg:gap-0"
              >
                {/* Node: a gold diamond sitting on the connector. */}
                <span className="relative flex shrink-0 flex-col items-center lg:block">
                  <span
                    aria-hidden="true"
                    className="mt-1 block h-3.5 w-3.5 rotate-45 border border-gb-gold bg-gb-black transition-[background-color,transform] duration-500 ease-[var(--ease-gb)] group-hover:scale-125 group-hover:bg-gb-gold"
                  />
                  {/* Vertical connector for the stacked layout */}
                  {index < supplyFlow.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-gb-line lg:hidden"
                    />
                  ) : null}
                </span>

                <div className="min-w-0 pb-2 lg:pt-8">
                  <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-gb-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-gb-silver-light transition-colors duration-300 group-hover:text-gb-gold-light sm:text-2xl">
                    {stage.label}
                  </h3>

                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-gb-silver">
                    {stage.detail}
                  </p>
                </div>

                {index < supplyFlow.length - 1 ? (
                  <Icon
                    name="arrowRight"
                    aria-hidden="true"
                    className="absolute top-0 -right-4 hidden h-4 w-4 text-gb-silver-dark lg:block"
                  />
                ) : null}
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
