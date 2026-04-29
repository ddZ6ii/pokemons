import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

function renderPokedex() {
  return renderWithProviders(<Pokedex />)
}

describe('Pokedex', () => {
  it('shows skeleton while loading', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise((_resolve) => undefined),
    )

    renderPokedex()

    const container = screen.getByRole('status')
    const list = screen.getByRole('status')
    const listItems = within(list).getAllByRole('listitem')
    expect(container).toBeInTheDocument()
    expect(listItems).toHaveLength(12)
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

    await userEvent.click(screen.getByRole('button', { name: /retry/i }))

    await waitFor(() =>
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument(),
    )
  })
})
