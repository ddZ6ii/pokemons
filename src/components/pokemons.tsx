import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import { ErrorFallback, PokemonList, PokemonListSkeleton } from '@/components'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/utilities'

const WidgetFallback = (props: FallbackProps) => (
  <ErrorFallback
    {...props}
    title="Failed to load pokemons"
    className="h-full"
  />
)

export default function Pokemons({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn('flex flex-col items-center gap-8', className)}
      {...props}
    >
      <Heading as="h1" className="text-center">
        Pokédex
      </Heading>

      <div className="relative flex-1">
        {/* 
        ℹ️ How QueryErrorResetBoundary works
        
          1. resetErrorBoundary calls reset (from QueryErrorResetBoundary). This tells TanStack Query to clear the error state for queries inside the boundary.

          2. ErrorBoundary then re-renders its children. useSuspenseQuery runs again, sees the query is no longer in error state, and triggers a fresh fetch (suspending while it loads).

          Without QueryErrorResetBoundary, clicking retry would re-render the component but useSuspenseQuery would immediately re-throw the cached error — no network request would be made.
         */}
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={WidgetFallback} onReset={reset}>
              <Suspense fallback={<PokemonListSkeleton />}>
                <PokemonList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </section>
  )
}
