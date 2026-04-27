import { pokemonService } from '@/api'
import { useFetch } from '@/hooks'
import type { Pokemon } from '@/schemas'

export default function usePokemons() {
  return useFetch<Pokemon[]>(pokemonService.getPokemons.bind(pokemonService))
}
