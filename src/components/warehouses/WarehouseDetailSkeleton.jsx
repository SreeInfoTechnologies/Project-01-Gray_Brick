import { Container } from '@/components/common/Container'
import { Skeleton } from '@/components/common/Skeleton'

/** Mirrors the detail page masthead and first section while data is in flight. */
export function WarehouseDetailSkeleton() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading facility</span>

      <div className="bg-gb-graphite pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-20">
        <Container>
          <Skeleton className="h-3 w-56 bg-gb-industrial/60" />
          <Skeleton className="mt-9 h-3 w-32 bg-gb-industrial/60" />
          <Skeleton className="mt-5 h-11 w-full max-w-2xl bg-gb-industrial/60 sm:h-14" />
          <div className="mt-6 flex flex-wrap gap-6">
            <Skeleton className="h-4 w-52 bg-gb-dark" />
            <Skeleton className="h-4 w-32 bg-gb-dark" />
          </div>
          <Skeleton className="mt-8 h-13 w-60 bg-gb-industrial/60 sm:h-14" />
        </Container>
      </div>

      <div className="bg-gb-white py-18 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-4 lg:col-span-7">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="mt-6 h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-4 border border-gb-line-light bg-gb-pure p-6 sm:p-8">
                <Skeleton className="h-3 w-24" />
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
