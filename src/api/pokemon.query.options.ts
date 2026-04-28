import { queryOptions } from '@tanstack/react-query'

import { pokemonService } from '@/api'

const createPokemonsQueryOptions = () =>
  queryOptions({
    queryKey: ['pokemons'],
    queryFn: ({ signal }) => pokemonService.getPokemons(signal),
  })

export { createPokemonsQueryOptions }
