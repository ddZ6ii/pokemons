import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { SelectSortByOptions, SelectSortOrderOptions } from '@/schemas'
import { useFiltersActions, useSortFilters } from '@/store'
import { renderWithProviders } from '@/tests/utilities'
import Sorting from './sorting'

const SELECT_SORTING_CRITERIA_LABEL = /select sorting criteria/i
const SELECT_SORTING_ORDER_LABEL = /select sorting order/i
const SHOW_SORTING_OPTIONS_LABEL = /show sorting options/i

const setSorting = vi.fn()
const resetSorting = vi.fn()

vi.mock('@/store', () => ({
  useSortFilters: vi.fn(),
  useFiltersActions: vi.fn(),
}))

function mockStore(
  sortBy: SelectSortByOptions | null = null,
  sortOrder: SelectSortOrderOptions | null = null,
) {
  vi.mocked(useSortFilters).mockReturnValue({ sortBy, sortOrder })
  vi.mocked(useFiltersActions).mockReturnValue({
    setSorting,
    resetSorting,
    setPage: vi.fn(),
    setPerPage: vi.fn(),
    setSearch: vi.fn(),
  })
}

function mockMobile() {
  vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

beforeEach(() => {
  setSorting.mockClear()
  resetSorting.mockClear()
})

describe('Desktop', () => {
  beforeEach(() => {
    mockStore()
  })

  it('renders "Sort by" and "Order by" selects', () => {
    renderWithProviders(<Sorting />)

    expect(
      screen.getByRole('combobox', { name: SELECT_SORTING_CRITERIA_LABEL }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', { name: SELECT_SORTING_ORDER_LABEL }),
    ).toBeInTheDocument()
  })

  it('calls setSorting with "asc" when no sortOrder is set', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Sorting />)

    await user.click(
      screen.getByRole('combobox', { name: SELECT_SORTING_CRITERIA_LABEL }),
    )
    await user.click(await screen.findByRole('option', { name: /^name$/i }))

    expect(setSorting).toHaveBeenCalledWith('name', 'asc')
  })

  it('clears sort-by calls setSorting(null, null)', async () => {
    mockStore('name', 'desc')
    const user = userEvent.setup()
    renderWithProviders(<Sorting />)

    await user.click(
      screen.getByRole('combobox', { name: SELECT_SORTING_CRITERIA_LABEL }),
    )
    await user.click(
      await screen.findByRole('option', { name: /clear selection/i }),
    )

    expect(setSorting).toHaveBeenCalledWith(null, null)
  })

  it('calls setSorting with current sortBy and new order when selecting sort-order', async () => {
    mockStore('name', 'asc')
    const user = userEvent.setup()
    renderWithProviders(<Sorting />)

    await user.click(
      screen.getByRole('combobox', { name: SELECT_SORTING_ORDER_LABEL }),
    )
    await user.click(await screen.findByRole('option', { name: /descending/i }))

    expect(setSorting).toHaveBeenCalledWith('name', 'desc')
  })
})

describe('Mobile', () => {
  beforeEach(() => {
    mockMobile()
    mockStore()
  })

  it('renders a trigger button with accessible label', () => {
    renderWithProviders(<Sorting />)
    expect(
      screen.getByRole('button', { name: SHOW_SORTING_OPTIONS_LABEL }),
    ).toBeInTheDocument()
  })

  it('triggers button has no primary style when no sort is active', () => {
    renderWithProviders(<Sorting />)
    expect(
      screen.getByRole('button', { name: SHOW_SORTING_OPTIONS_LABEL }),
    ).not.toHaveClass('bg-primary!')
  })

  it('triggers button has primary style when a sort is active', () => {
    mockStore('name', 'asc')
    renderWithProviders(<Sorting />)
    expect(
      screen.getByRole('button', { name: SHOW_SORTING_OPTIONS_LABEL }),
    ).toHaveClass('bg-primary!')
  })

  it('commits draft sort to the store when Apply is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Sorting />)

    await user.click(
      screen.getByRole('button', { name: SHOW_SORTING_OPTIONS_LABEL }),
    )
    const drawer = await screen.findByRole('dialog')

    await user.click(
      within(drawer).getByRole('combobox', {
        name: SELECT_SORTING_CRITERIA_LABEL,
      }),
    )
    await user.click(await screen.findByRole('option', { name: /^name$/i }))

    await user.click(within(drawer).getByRole('button', { name: /apply/i }))

    expect(setSorting).toHaveBeenCalledWith('name', 'asc')
  })

  it('calls resetSorting when Reset button is clicked', async () => {
    mockStore('name', 'asc')
    const user = userEvent.setup()
    renderWithProviders(<Sorting />)

    await user.click(
      screen.getByRole('button', { name: SHOW_SORTING_OPTIONS_LABEL }),
    )
    const drawer = await screen.findByRole('dialog')
    await user.click(within(drawer).getByRole('button', { name: /reset/i }))

    expect(resetSorting).toHaveBeenCalled()
  })

  it('discards the draft without applying when closing the drawer', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Sorting />)

    await user.click(
      screen.getByRole('button', { name: SHOW_SORTING_OPTIONS_LABEL }),
    )
    const drawer = await screen.findByRole('dialog')

    await user.click(
      within(drawer).getByRole('combobox', {
        name: SELECT_SORTING_CRITERIA_LABEL,
      }),
    )
    await user.click(await screen.findByRole('option', { name: /^name$/i }))

    await user.keyboard('{Escape}')
    // Vaul keeps the dialog mounted for exit animations; wait for closed state
    await waitFor(() =>
      expect(screen.getByRole('dialog')).toHaveAttribute(
        'data-state',
        'closed',
      ),
    )

    // Draft was not committed — closing without Apply must not call setSorting
    expect(setSorting).not.toHaveBeenCalled()
  })
})
