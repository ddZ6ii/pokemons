import { queryOptions } from '@tanstack/react-query'

import { APIParamsSchema, type QueryOptions } from '@/features/filters/schemas'
import { pokemonService } from '@/features/pokemons/api'
import { type PokemonsPaginatedResponse } from '@/features/pokemons/schemas'
import { HttpError, ValidationError } from '@/shared/api'

const createPokemonsQueryOptions = (options?: QueryOptions) => {
  const parsedOptions = APIParamsSchema.safeParse(options)
  if (!parsedOptions.success) {
    throw new ValidationError(parsedOptions.error)
  }
  const searchParams = parsedOptions.data

  return queryOptions({
    queryKey: ['pokemons', searchParams],
    queryFn: ({ signal }) =>
      pokemonService.getPokemons(searchParams, signal).catch((err: unknown) => {
        // 404 no pokemons exist yet (expected error) -> treat inline as empty list so useSuspenseQuery never throws.
        // All other errors bubble up to the nearest error boundary.
        if (err instanceof HttpError && err.status === 404)
          return {
            first: 1,
            prev: null,
            next: null,
            last: 1,
            pages: 0,
            items: 0,
            data: [],
          } satisfies PokemonsPaginatedResponse
        throw err
      }),
  })
}

export { createPokemonsQueryOptions }
