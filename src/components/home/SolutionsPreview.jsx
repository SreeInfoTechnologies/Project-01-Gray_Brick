import { SolutionCard } from './SolutionCard'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { homeSolutions } from '@/data/solutions'

export function SolutionsPreview() {
  const [featured, ...rest] = homeSolutions

  return (
    <section className="bg-gb-pure py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we provide"
          index="03"
          title="Four ways to take space with Gray Brick"
          lead="You might need to be running next month. You might need something built around your process. Either way, it starts with the same conversation."
          action={
            <Button to="/solutions" variant="outline" withArrow>
              See all solutions
            </Button>
          }
        />

        {/* The first solution takes a wide, horizontal card so the section opens
            with hierarchy rather than four identical boxes; the rest run three
            across beneath it. */}
        <div className="mt-12 flex flex-col gap-6 lg:mt-16 lg:gap-8">
          <Reveal>
            <SolutionCard solution={featured} layout="feature" />
          </Reveal>

          <div className="gb-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((solution) => (
              <Reveal key={solution.id} className="h-full">
                <SolutionCard solution={solution} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
