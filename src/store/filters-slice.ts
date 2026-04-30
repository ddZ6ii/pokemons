import type { StateCreator } from 'zustand'

import type { Filters } from '@/schemas'

type FilterActions = {
  filterActions: {
    setPage: (nextPage: number) => void
    setPerPage: (nextPerPage: Filters['perPage']) => void
  }
}
type FilterSlice = Filters & FilterActions

const initialFilterState: Filters = {
  page: 1,
  perPage: 10,
}

const createFilterSlice: StateCreator<FilterSlice, [], [], FilterSlice> = (
  set,
) => ({
  // Initial default values (overriden by persisted values if any)
  ...initialFilterState,
  filterActions: {
    setPage: (nextPage) => {
      set({ page: nextPage })
    },
    setPerPage: (nextPerPage) => {
      set({ perPage: nextPerPage, page: initialFilterState.page })
    },
  },
})

export { createFilterSlice, initialFilterState, type FilterSlice }
