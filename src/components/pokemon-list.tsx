import { HttpError, ValidationError } from '@/api'
import { ErrorAlert, PokemonCard, PokemonCardSkeleton } from '@/components'
import { usePokemons } from '@/hooks'

const noResult = <p className="text-center">No pokemons found.</p>

function PokemonList() {
  const { data, loading, error, refetch } = usePokemons()

  if (loading) {
    return <PokemonListSkeleton />
  }

  if (error) {
    // ValidationError → API contract broken → Re-throw → boundary
    if (error instanceof ValidationError) throw error
    // Ressource missing (expected error) → handle inline
    if (error instanceof HttpError && error.status === 404) return noResult
    // 5xx or unknown → retryable; 4xx (non-404) → permanent, no retry
    const isRetryable = !(error instanceof HttpError && error.status < 500)
    return (
      <ErrorAlert
        title="Failed to load pokemons"
        errorMessage={error.message}
        onRetry={isRetryable ? refetch : undefined}
      />
    )
  }

  if (!data || data.length === 0) {
    return noResult
  }

  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {data.map((pokemon) => (
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
