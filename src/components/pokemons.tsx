import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useState, useTransition } from 'react'

import { createPokemonsQueryOptions } from '@/api'
import { PaginationBar, PokemonList } from '@/components'

export default function Pokemons() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const queryClient = useQueryClient()

  // ℹ️ Why useTransition?
  //
  // Problem:
  // useSuspenseQuery unmounts the current UI while fetching:
  // -> jumpy UI alterning between the content and the fallback
  // -> poor UX on each page transition
  //
  // Solution:
  // Show state data while fetching new data in the background:
  // -> prevents the UI from being replaced by a fallback during an update
  // But since `placeholderData` does not exist with useSuspenseQuery:
  // -> wrap the updates that change the QueryKey with React startTransition
  // -> pass isPending to Pagination to disable controls until the transition settles
  const [isPending, startTransition] = useTransition()

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

  const handlePageChange = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= maxPage) {
      // If this update suspends, don't hide the already displayed content
      startTransition(() => {
        setPage(nextPage)
      })
    }
  }
  const handlePageHover = async (nextPage: number) => {
    await queryClient.prefetchQuery(
      createPokemonsQueryOptions({ page: nextPage }),
    )
  }
  const handlePerPageChange = (nextPerPage: number) => {
    startTransition(() => {
      setPerPage(nextPerPage)
    })
  }

  return (
    <>
      <PokemonList pokemons={pokemons} />
      <PaginationBar
        disabled={isPending}
        maxPage={maxPage}
        page={page}
        perPage={perPage}
        onPageChange={handlePageChange}
        onPageHover={handlePageHover}
        onPerPageChange={handlePerPageChange}
      />
    </>
  )
}
