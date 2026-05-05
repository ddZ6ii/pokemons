import {
  PokemonCardMemoized,
  PokemonCardSkeleton,
} from '@/features/pokemons/components/pokemon-card'
import type { Pokemon } from '@/features/pokemons/schemas'
import { cn } from '@/shared/lib/utils'
import { usePerPage } from '@/shared/store'

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
          <PokemonCardMemoized pokemon={pokemon} />
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

export { PokemonList, PokemonListSkeleton }
