import { Filters, Pokemons } from '@/components'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/utilities'

export default function Pokedex({
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
      <Filters />
      <Pokemons />
    </section>
  )
}
