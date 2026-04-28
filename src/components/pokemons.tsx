import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import { ErrorFallback, PokemonList } from '@/components'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/utilities'

const WidgetFallback = (props: FallbackProps) => (
  <ErrorFallback {...props} className="h-full" />
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
        <ErrorBoundary FallbackComponent={WidgetFallback}>
          <PokemonList />
        </ErrorBoundary>
      </div>
    </section>
  )
}
