import { describe, expect, it, vi } from 'vitest'

import { HttpError, pokemonService, ServerError, ValidationError } from '@/api'
import type { Pokemon } from '@/schemas'

const validPokemons: Pokemon[] = [
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
]

function mockFetch(body: unknown, status = 200) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
    new Response(JSON.stringify(body), { status }),
  )
}

describe('pokemonService.getPokemons', () => {
  it('returns parsed pokemon array on 200 with valid body', async () => {
    mockFetch(validPokemons)
    await expect(pokemonService.getPokemons()).resolves.toEqual(validPokemons)
  })

  it('throws HttpError on 404', async () => {
    mockFetch(null, 404)
    const err = await pokemonService.getPokemons().catch((e: unknown) => e)
    expect(err).toBeInstanceOf(HttpError)
    expect((err as HttpError).status).toBe(404)
  })

  it('throws HttpError on 500', async () => {
    mockFetch(null, 500)
    const err = await pokemonService.getPokemons().catch((e: unknown) => e)
    expect(err).toBeInstanceOf(HttpError)
    expect((err as HttpError).status).toBe(500)
  })

  it('throws ValidationError on invalid response shape', async () => {
    mockFetch({ not: 'an array' })
    await expect(pokemonService.getPokemons()).rejects.toBeInstanceOf(
      ValidationError,
    )
  })

  it('re-throws abort error without wrapping', async () => {
    const abortError = new DOMException('Aborted', 'AbortError')
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(abortError)
    const err = await pokemonService.getPokemons().catch((e: unknown) => e)
    expect(err).toBeInstanceOf(DOMException)
    expect((err as DOMException).name).toBe('AbortError')
  })

  it('throws ServerError on network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
      new TypeError('Failed to fetch'),
    )
    await expect(pokemonService.getPokemons()).rejects.toBeInstanceOf(
      ServerError,
    )
  })
})
