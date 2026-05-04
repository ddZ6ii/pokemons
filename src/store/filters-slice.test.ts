import { describe, expect, it } from 'vitest'
import { create } from 'zustand'

import {
  createFilterSlice,
  initialFilterState,
  type FilterSlice,
} from './filters-slice'

function makeStore() {
  return create<FilterSlice>()((...a) => createFilterSlice(...a))
}

describe('setSorting', () => {
  it('sets sortBy and sortOrder', () => {
    const store = makeStore()
    store.getState().filterActions.setSorting('name', 'desc')
    expect(store.getState().sortBy).toBe('name')
    expect(store.getState().sortOrder).toBe('desc')
  })

  it('accepts null sortBy', () => {
    const store = makeStore()
    store.getState().filterActions.setSorting(null, 'asc')
    expect(store.getState().sortBy).toBeNull()
  })

  it('does not reset page', () => {
    const store = makeStore()
    store.getState().filterActions.setPage(3)
    store.getState().filterActions.setSorting('name', 'asc')
    expect(store.getState().page).toBe(3)
  })
})

describe('resetSorting', () => {
  it('restores sortBy to null and sortOrder to asc', () => {
    const store = makeStore()
    store.getState().filterActions.setSorting('attack', 'desc')
    store.getState().filterActions.resetSorting()
    expect(store.getState().sortBy).toBe(initialFilterState.sortBy)
    expect(store.getState().sortOrder).toBe(initialFilterState.sortOrder)
  })

  it('does not reset page', () => {
    const store = makeStore()
    store.getState().filterActions.setPage(3)
    store.getState().filterActions.resetSorting()
    expect(store.getState().page).toBe(3)
  })
})
