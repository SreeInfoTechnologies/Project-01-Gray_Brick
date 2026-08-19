import { Link } from 'react-router-dom'

import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'

// Entry points written as the question a visitor already has in their head,
// rather than as features we would like to talk about.
const STARTING_POINTS = [
  {
    icon: 'pin',
    question: 'Moving into a new market?',
    answer:
      'Find space that supports the next location without starting the search from scratch every time.',
    cta: 'Explore warehouses',
    to: '/warehouses',
  },
  {
    icon: 'clock',
    question: 'Need to start operations quickly?',
    answer:
      'Ready-to-move facilities cut the time between signing an agreement and actually running.',
    cta: 'See ready-to-move space',
    to: '/solutions#ready-to-move',
  },
  {
    icon: 'blueprint',
    question: 'Need a different layout?',
    answer:
      'If your storage or access requirement is specific, built-to-suit starts with how you work.',
    cta: 'Discuss your requirement',
    to: '/solutions#built-to-suit',
  },
  {
    icon: 'network',
    question: 'Expanding across Bengaluru?',
    answer:
      'Pick locations that make sense for inventory movement, workforce access and daily distribution.',
    cta: 'Talk to Gray Brick',
    to: '/contact',
  },
]

export function ProblemCards() {
  return (
    <section className="bg-gb-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Where to begin"
          index="02"
          title="Most conversations start with one of these"
          lead="You rarely need a tour of a building first. You need to know whether the space fits the problem in front of you."
        />

        <ul className="gb-stagger mt-12 grid grid-cols-1 border-t border-l border-gb-line-light sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STARTING_POINTS.map((item) => (
            <Reveal as="li" key={item.question} variant="fade" className="border-r border-b border-gb-line-light">
              <Link
                to={item.to}
                className="group flex h-full flex-col gap-4 bg-gb-pure p-6 transition-colors duration-500 hover:bg-gb-graphite lg:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-gb-line-light text-gb-gold-dark transition-[border-color,color,transform] duration-500 ease-[var(--ease-gb)] group-hover:-translate-y-0.5 group-hover:border-gb-gold group-hover:text-gb-gold">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>

                <h3 className="text-[1.0625rem] leading-snug font-bold tracking-tight text-gb-graphite transition-colors duration-500 group-hover:text-gb-white sm:text-lg">
                  {item.question}
                </h3>

                <p className="text-[0.875rem] leading-relaxed text-gb-concrete transition-colors duration-500 group-hover:text-gb-silver">
                  {item.answer}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-4 text-[0.75rem] font-semibold tracking-[0.08em] text-gb-industrial uppercase transition-colors duration-500 group-hover:text-gb-gold">
                  {item.cta}
                  <Icon name="arrowRight" className="gb-arrow h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
