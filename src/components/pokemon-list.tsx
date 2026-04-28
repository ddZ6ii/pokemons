import { useQuery } from '@tanstack/react-query'

import { createPokemonsQueryOptions, HttpError } from '@/api'
import { ErrorAlert, PokemonCard, PokemonCardSkeleton } from '@/components'

const noResult = <p className="text-center">No pokemons found.</p>

function PokemonList() {
  const {
    data: pokemons,
    isError,
    isPending,
    error,
    refetch,
  } = useQuery(createPokemonsQueryOptions())

  if (isPending) {
    return <PokemonListSkeleton />
  }

  if (isError) {
    // ValidationError are handled globally in the queryClient's options.
    // Ressource missing (expected error) → handle inline.
    if (error instanceof HttpError && error.status === 404) return noResult
    // 5xx or unknown → retryable.
    // 4xx (non-404) → permanent, no retry.
    const isRetryable = !(error instanceof HttpError && error.status < 500)
    return (
      <ErrorAlert
        title="Failed to load pokemons"
        errorMessage={error.message}
        onRetry={isRetryable ? refetch : undefined}
      />
    )
  }

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
