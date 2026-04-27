import { describe, expect, it } from 'vitest'

import {
  pokemonSchema,
  pokemonsPaginatedResponseSchema,
  pokemonsResponseSchema,
  type Pokemon,
} from './pokemon.schema'

const validPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  type: ['Grass', 'Poison'],
  hp: 45,
  attack: 49,
  defense: 49,
  special_attack: 65,
  special_defense: 65,
  speed: 45,
}

describe('pokemonSchema', () => {
  it('accepts a valid pokemon', () => {
    expect(pokemonSchema.parse(validPokemon)).toEqual(validPokemon)
  })

  it('coerces id from string', () => {
    expect(pokemonSchema.parse({ ...validPokemon, id: '1' }).id).toBe(1)
  })

  it('rejects id 0', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, id: 0 })).toThrow()
  })

  it('rejects negative id', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, id: -1 })).toThrow()
  })

  it('rejects non-integer id', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, id: 1.5 })).toThrow()
  })

  it('rejects empty name', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, name: '' })).toThrow()
  })

  it('rejects empty type array', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, type: [] })).toThrow()
  })

  it('accepts single-element type array', () => {
    expect(() =>
      pokemonSchema.parse({ ...validPokemon, type: ['Fire'] }),
    ).not.toThrow()
  })

  it('rejects hp of 0', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, hp: 0 })).toThrow()
  })

  it('rejects negative attack', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, attack: -1 })).toThrow()
  })

  it('rejects non-integer defense', () => {
    expect(() =>
      pokemonSchema.parse({ ...validPokemon, defense: 49.5 }),
    ).toThrow()
  })

  it('rejects non-integer special_attack', () => {
    expect(() =>
      pokemonSchema.parse({ ...validPokemon, special_attack: 1.1 }),
    ).toThrow()
  })

  it('rejects non-integer special_defense', () => {
    expect(() =>
      pokemonSchema.parse({ ...validPokemon, special_defense: 1.1 }),
    ).toThrow()
  })

  it('rejects speed of 0', () => {
    expect(() => pokemonSchema.parse({ ...validPokemon, speed: 0 })).toThrow()
  })

  it('rejects missing required field', () => {
    const { hp: _, ...withoutHp } = validPokemon
    expect(() => pokemonSchema.parse(withoutHp)).toThrow()
  })
})

describe('pokemonsResponseSchema', () => {
  it('accepts an array of valid pokemons', () => {
    expect(pokemonsResponseSchema.parse([validPokemon])).toEqual([validPokemon])
  })

  it('accepts an empty array', () => {
    expect(pokemonsResponseSchema.parse([])).toEqual([])
  })

  it('rejects an array with an invalid pokemon', () => {
    expect(() =>
      pokemonsResponseSchema.parse([{ ...validPokemon, hp: 0 }]),
    ).toThrow()
  })

  it('rejects a non-array', () => {
    expect(() => pokemonsResponseSchema.parse(validPokemon)).toThrow()
  })
})

describe('pokemonsPaginatedResponseSchema', () => {
  const validPaginated = {
    data: [validPokemon],
    first: 1,
    prev: null,
    next: 2,
    last: 10,
    pages: 10,
    items: 100,
  }

  it('accepts a valid paginated response', () => {
    expect(pokemonsPaginatedResponseSchema.parse(validPaginated)).toEqual(
      validPaginated,
    )
  })

  it('accepts null for prev and next', () => {
    expect(() =>
      pokemonsPaginatedResponseSchema.parse({
        ...validPaginated,
        prev: null,
        next: null,
      }),
    ).not.toThrow()
  })

  it('accepts numbers for prev and next', () => {
    expect(() =>
      pokemonsPaginatedResponseSchema.parse({
        ...validPaginated,
        prev: 1,
        next: 3,
      }),
    ).not.toThrow()
  })

  it('rejects string for prev', () => {
    expect(() =>
      pokemonsPaginatedResponseSchema.parse({
        ...validPaginated,
        prev: 'none',
      }),
    ).toThrow()
  })

  it('rejects string for next', () => {
    expect(() =>
      pokemonsPaginatedResponseSchema.parse({
        ...validPaginated,
        next: 'none',
      }),
    ).toThrow()
  })

  it('rejects missing data field', () => {
    const { data: _, ...withoutData } = validPaginated
    expect(() => pokemonsPaginatedResponseSchema.parse(withoutData)).toThrow()
  })

  it('rejects invalid pokemon inside data', () => {
    expect(() =>
      pokemonsPaginatedResponseSchema.parse({
        ...validPaginated,
        data: [{ ...validPokemon, id: -1 }],
      }),
    ).toThrow()
  })

  it('accepts empty data array', () => {
    expect(() =>
      pokemonsPaginatedResponseSchema.parse({ ...validPaginated, data: [] }),
    ).not.toThrow()
  })
})
