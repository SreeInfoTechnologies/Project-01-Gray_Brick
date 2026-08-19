import { Container } from './Container'
import { Skeleton } from './Skeleton'

/** Shown while a route chunk downloads. Matches the shape of a page masthead. */
export function RouteFallback() {
  return (
    <div className="bg-gb-graphite" role="status" aria-live="polite">
      <Container className="pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
        <span className="sr-only">Loading</span>
        <Skeleton className="h-3 w-28 bg-gb-industrial/70" />
        <Skeleton className="mt-6 h-10 w-full max-w-xl bg-gb-industrial/70 sm:h-14" />
        <Skeleton className="mt-4 h-10 w-3/4 max-w-lg bg-gb-industrial/70 sm:h-14" />
        <Skeleton className="mt-8 h-4 w-full max-w-2xl bg-gb-dark" />
        <Skeleton className="mt-3 h-4 w-5/6 max-w-xl bg-gb-dark" />
      </Container>
    </div>
  )
}
