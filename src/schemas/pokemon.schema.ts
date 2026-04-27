import z from 'zod'

const POKEMON_TYPES = [
  'Bug',
  'Dark',
  'Dragon',
  'Electric',
  'Fairy',
  'Fighting',
  'Fire',
  'Flying',
  'Ghost',
  'Grass',
  'Ground',
  'Ice',
  'Normal',
  'Poison',
  'Psychic',
  'Rock',
  'Steel',
  'Water',
] as const

const POKEMON_SKILLS = ['hp', 'attack', 'defense', 'speed'] as const

const pokemonTypeSchema = z.enum(POKEMON_TYPES)
const _pokemonSkillsSchema = z.enum(POKEMON_SKILLS)

const pokemonSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(1),
  type: z.array(pokemonTypeSchema).min(1),
  hp: z.number().int().positive(),
  attack: z.number().int().positive(),
  defense: z.number().int().positive(),
  special_attack: z.number().int().positive(),
  special_defense: z.number().int().positive(),
  speed: z.number().int().positive(),
})

const pokemonsResponseSchema = z.array(pokemonSchema)
const pokemonsPaginatedResponseSchema = z.object({
  data: z.array(pokemonSchema),
  first: z.number(),
  prev: z.number().nullable(),
  next: z.number().nullable(),
  last: z.number(),
  pages: z.number(),
  items: z.number(),
})

type PokemonType = z.infer<typeof pokemonTypeSchema>
type PokemonSkills = z.infer<typeof _pokemonSkillsSchema>
type Pokemon = z.infer<typeof pokemonSchema>
type Pokemons = z.infer<typeof pokemonsResponseSchema>
type PokemonsPaginatedResponse = z.infer<typeof pokemonsPaginatedResponseSchema>

export {
  POKEMON_TYPES,
  POKEMON_SKILLS,
  pokemonSchema,
  pokemonsResponseSchema,
  pokemonsPaginatedResponseSchema,
  type Pokemon,
  type Pokemons,
  type PokemonType,
  type PokemonSkills,
  type PokemonsPaginatedResponse,
}
