import type { StateCreator } from 'zustand'

import type { Filters } from '@/features/filters/schemas'

type FilterActions = {
  filterActions: {
    setPage: (nextPage: Filters['page']) => void
    setPerPage: (nextPerPage: Filters['perPage']) => void
    setSearch: (nextSearch: Filters['search']) => void
    setSorting: (
      nextSortBy: Filters['sortBy'],
      nextSortOrder: Filters['sortOrder'],
    ) => void
    resetSorting: () => void
  }
}
type FilterSlice = Filters & FilterActions

const initialFilterState: Filters = {
  page: 1,
  perPage: 10,
  search: '',
  sortOrder: null,
  sortBy: null,
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
    setSearch: (nextSearch) => {
      set({ search: nextSearch, page: initialFilterState.page })
    },
    setSorting: (nextSortBy, nextSortOrder) => {
      set({ sortBy: nextSortBy, sortOrder: nextSortOrder })
    },
    resetSorting: () => {
      set({
        sortBy: initialFilterState.sortBy,
        sortOrder: initialFilterState.sortOrder,
      })
    },
  },
})

export { createFilterSlice, initialFilterState, type FilterSlice }
