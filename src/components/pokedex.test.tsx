import { act, fireEvent, screen, waitFor, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import Pokedex from './pokedex'
import type { PokemonsPaginatedResponse } from '@/schemas'
import { initialFilterState } from '@/store/filters-slice'
import { renderWithProviders } from '@/tests/utilities'

const POKEMONS_URL = '*/pokemons'
const successResponse: PokemonsPaginatedResponse = {
  first: 1,
  prev: null,
  next: null,
  last: 1,
  pages: 1,
  items: 1,
  data: [
    {
      id: 1,
      name: 'Bulbasaur',
      type: ['Grass', 'Poison'],
      hp: 45,
      attack: 49,
      defense: 49,
      special_attack: 65,
      special_defense: 65,
      speed: 45,
    },
  ],
}
const server = setupServer()

function renderPokedex() {
  return renderWithProviders(<Pokedex />)
}

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe('Pokedex', () => {
  it('shows skeleton while loading', async () => {
    let resolveFetch: (response: Response) => void
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          // Promise extraction: save the resolve function to call it later in the test
          resolveFetch = resolve
        }),
    )

    // Calls fetch within useSuspenseQuery -> returns a forever-pending promise -> component shows skeleton
    renderPokedex()

    // Assertions happen here while fetch is still pending
    const container = screen.getByRole('status')
    const list = screen.getByRole('status')
    const listItems = within(list).getAllByRole('listitem')
    expect(container).toBeInTheDocument()
    expect(listItems).toHaveLength(initialFilterState.perPage)

    // Cleanly resolve the fetch promise to avoid test leaks and allow any pending effects to finish
    await act(
      () =>
        new Promise<void>((resolve) => {
          resolveFetch(
            new Response(JSON.stringify(successResponse), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          )
          resolve()
        }),
    )
  })

  it('shows empty state when no pokemons exist', async () => {
    server.use(
      http.get(POKEMONS_URL, () => new HttpResponse(null, { status: 404 })),
    )

    renderPokedex()

    await waitFor(() =>
      expect(screen.getByText('No pokemons found.')).toBeInTheDocument(),
    )
  })

  it('shows error without retry button for non-recoverable errors', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    server.use(
      http.get(POKEMONS_URL, () => new HttpResponse(null, { status: 400 })),
    )

    renderPokedex()

    await waitFor(() =>
      expect(screen.getByText('Failed to load pokemons')).toBeInTheDocument(),
    )
    expect(
      screen.queryByRole('button', { name: /retry/i }),
    ).not.toBeInTheDocument()
  })

  it('shows error fallback then recovers after retry', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    server.use(
      // First call: 500 → triggers error boundary
      http.get(POKEMONS_URL, () => new HttpResponse(null, { status: 500 }), {
        once: true,
      }),
      // Subsequent calls: success → recovery
      http.get(POKEMONS_URL, () => HttpResponse.json(successResponse)),
    )

    renderPokedex()

    await waitFor(() =>
      expect(screen.getByText('Failed to load pokemons')).toBeInTheDocument(),
    )

    fireEvent.click(screen.getByRole('button', { name: /retry/i }))

    await waitFor(() =>
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument(),
    )
  })
})
