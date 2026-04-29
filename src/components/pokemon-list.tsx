import { useSuspenseQuery } from '@tanstack/react-query'

import { createPokemonsQueryOptions } from '@/api'
import { PokemonCard, PokemonCardSkeleton } from '@/components'

const noResult = <p className="text-center">No pokemons found.</p>

function PokemonList() {
  // ℹ️ How useSuspenseQuery works
  //
  // useSuspenseQuery throws synchronously on error.
  // The component never reaches the return statement.
  // -> `error`, `isError` and related component's branching logic are unreachable.
  // React bubbles the error up to the closest error boundary.

  const {
    data: { data: pokemons },
  } = useSuspenseQuery(createPokemonsQueryOptions())

  if (pokemons.length === 0) {
    return noResult
  }

  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  )
}

function PokemonListSkeleton() {
  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index}>
          <PokemonCardSkeleton />
        </li>
      ))}
    </ul>
  )
}

export default PokemonList
export { PokemonListSkeleton }
