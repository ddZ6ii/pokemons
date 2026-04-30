import { PokemonCard, PokemonCardSkeleton } from '@/components'
import type { Pokemon } from '@/schemas'
import { usePerPage } from '@/store'
import { cn } from '@/utilities'

type PokemonListProps = React.ComponentProps<'ul'> & {
  pokemons: Pokemon[]
}

function PokemonList({ className, pokemons, ...props }: PokemonListProps) {
  if (pokemons.length === 0) {
    return <p className="text-center">No pokemons found.</p>
  }

  return (
    <ul
      className={cn('flex flex-1 flex-wrap justify-center gap-6', className)}
      {...props}
    >
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  )
}

function PokemonListSkeleton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const perPage = usePerPage()

  return (
    <div role="status" aria-live="polite" className={className} {...props}>
      <ul className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: perPage }).map((_, index) => (
          <li key={index}>
            <PokemonCardSkeleton aria-hidden={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
export { PokemonListSkeleton }
