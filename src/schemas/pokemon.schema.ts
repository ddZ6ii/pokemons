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

const _pokemonTypeSchema = z.enum(POKEMON_TYPES)

const _pokemonSkillsSchema = z.enum(POKEMON_SKILLS)

const pokemonSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(1),
  type: z.array(_pokemonTypeSchema).min(1),
  hp: z.number().int().positive(),
  attack: z.number().int().positive(),
  defense: z.number().int().positive(),
  special_attack: z.number().int().positive(),
  special_defense: z.number().int().positive(),
  speed: z.number().int().positive(),
})

const _baseOptionsSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().max(100).default(10),
  sort: z.enum(['id', 'name']).default('id'),
  order: z.enum(['asc', 'desc']).default('asc'),
})
const pokemonsAPIParamsSchema = _baseOptionsSchema
  .optional()
  .transform((input) => {
    const { page, perPage, sort, order } = _baseOptionsSchema.parse(input ?? {})
    return {
      _page: page.toString(),
      _per_page: perPage.toString(),
      // json-server stringifies numeric IDs, making _sort=id lexicographic. Since db.json is already in ascending numeric order, omit _sort for this case.
      ...(sort !== 'id' && { _sort: order === 'asc' ? sort : `-${sort}` }),
    }
  })

const pokemonsResponseSchema = z.array(pokemonSchema)

const pokemonsPaginatedResponseSchema = z.object({
  first: z.number(),
  prev: z.number().nullable(),
  next: z.number().nullable(),
  last: z.number(),
  pages: z.number(),
  items: z.number(),
  data: z.array(pokemonSchema),
})

type PokemonType = z.infer<typeof _pokemonTypeSchema>
type PokemonSkills = z.infer<typeof _pokemonSkillsSchema>
type Pokemon = z.infer<typeof pokemonSchema>
type PokemonsOptions = z.input<typeof pokemonsAPIParamsSchema>
type PokemonsApiParams = z.output<typeof pokemonsAPIParamsSchema>
type Pokemons = z.infer<typeof pokemonsResponseSchema>
type PokemonsPaginatedResponse = z.infer<typeof pokemonsPaginatedResponseSchema>

export {
  POKEMON_TYPES,
  POKEMON_SKILLS,
  pokemonSchema,
  pokemonsAPIParamsSchema,
  pokemonsResponseSchema,
  pokemonsPaginatedResponseSchema,
  type Pokemon,
  type Pokemons,
  type PokemonsOptions,
  type PokemonsApiParams,
  type PokemonType,
  type PokemonSkills,
  type PokemonsPaginatedResponse,
}
