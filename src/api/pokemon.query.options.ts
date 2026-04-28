import { queryOptions } from '@tanstack/react-query'

import { HttpError, pokemonService } from '@/api'
import type { Pokemon } from '@/schemas/pokemon.schema'

const createPokemonsQueryOptions = () =>
  queryOptions({
    queryKey: ['pokemons'],
    queryFn: ({ signal }) =>
      pokemonService.getPokemons(signal).catch((err: unknown) => {
        // 404 no pokemons exist yet (expected error) -> treat inline as empty list so useSuspenseQuery never throws.
        // All other errors bubble up to the nearest error boundary.
        if (err instanceof HttpError && err.status === 404)
          return [] as Pokemon[]
        throw err
      }),
  })

export { createPokemonsQueryOptions }
