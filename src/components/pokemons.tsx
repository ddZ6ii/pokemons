import { useSuspenseQuery } from '@tanstack/react-query'

import { createPokemonsQueryOptions } from '@/api'
import { PaginationBar, PokemonList } from '@/components'
import { useFilters } from '@/store'

export default function Pokemons() {
  const { page, perPage } = useFilters()

  // ℹ️ How useSuspenseQuery works
  //
  // useSuspenseQuery throws synchronously on error.
  // The component never reaches the return statement.
  // -> `error`, `isError` and related component's branching logic are unreachable.
  // React bubbles the error up to the closest error boundary.
  const {
    data: { data: pokemons, pages: maxPage },
  } = useSuspenseQuery(
    createPokemonsQueryOptions({
      page,
      perPage,
    }),
  )

  return (
    <>
      <PokemonList pokemons={pokemons} />
      <PaginationBar maxPage={maxPage} />
    </>
  )
}
