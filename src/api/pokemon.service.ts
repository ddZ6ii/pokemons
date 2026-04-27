import { ZodError, type ZodType } from 'zod'

import { HttpError, ServerError, ValidationError } from '@/api'
import { envSchema, pokemonsResponseSchema, type Pokemons } from '@/schemas'
import { isAbortError } from '@/utilities'

class PokemonService {
  #baseUrl: string

  constructor() {
    const port = envSchema.parse(import.meta.env.VITE_API_PORT ?? '3000')
    this.#baseUrl = `http://localhost:${port.toString()}`
  }

  async #fetch<T>(
    url: string,
    schema: ZodType<T>,
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await fetch(url, { signal })
      if (!response.ok) throw new HttpError(response)
      return schema.parse(await response.json())
    } catch (error) {
      if (isAbortError(error)) throw error
      if (error instanceof HttpError) throw error
      if (error instanceof ZodError) throw new ValidationError(error)
      throw new ServerError(error)
    }
  }

  getPokemons(signal?: AbortSignal): Promise<Pokemons> {
    return this.#fetch(
      `${this.#baseUrl}/pokemons`,
      pokemonsResponseSchema,
      signal,
    )
  }
}

export const pokemonService = new PokemonService()
