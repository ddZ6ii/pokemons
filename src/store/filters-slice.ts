import type { StateCreator } from 'zustand'

import type { Filters } from '@/schemas'

type FilterActions = {
  filterActions: {
    setPage: (nextPage: Filters['page']) => void
    setPerPage: (nextPerPage: Filters['perPage']) => void
    setSearch: (nextSearch: Filters['search']) => void
    setSortBy: (nextSearch: Filters['sortBy']) => void
    setSortOrder: (nextSearch: Filters['sortOrder']) => void
  }
}
type FilterSlice = Filters & FilterActions

const initialFilterState: Filters = {
  page: 1,
  perPage: 10,
  search: '',
  sortBy: 'id',
  sortOrder: 'asc',
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
    setSortBy: (nextSortBy) => {
      set({ sortBy: nextSortBy })
    },
    setSortOrder: (nextSortOrder) => {
      set({ sortOrder: nextSortOrder })
    },
  },
})

export { createFilterSlice, initialFilterState, type FilterSlice }
