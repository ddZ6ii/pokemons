import z from 'zod'

import { POKEMON_SKILLS } from './pokemon.schema'

const PER_PAGE_OPTIONS = ['10', '20', '50', '100'] as const

const FilterSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z
    .union([z.literal(10), z.literal(20), z.literal(50), z.literal(100)])
    .default(10),
  search: z.string().optional(),
  sortBy: z.enum(['id', 'name', ...POKEMON_SKILLS]).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

const APIParamsSchema = FilterSchema.optional().transform((input) => {
  const { page, perPage, search, sortBy, sortOrder } = FilterSchema.parse(
    input ?? {},
  )
  return {
    _page: page.toString(),
    _per_page: perPage.toString(),
    ...(search && { 'name:contains': search }),
    // json-server stringifies numeric IDs, making _sort=id lexicographic. Since db.json is already in ascending numeric order, omit _sort for this case.
    ...(sortBy !== 'id' && {
      _sort: sortOrder === 'asc' ? sortBy : `-${sortBy}`,
    }),
  }
})

type Filters = z.infer<typeof FilterSchema>
type QueryOptions = z.input<typeof APIParamsSchema>
type ApiParams = z.output<typeof APIParamsSchema>

export {
  PER_PAGE_OPTIONS,
  APIParamsSchema,
  FilterSchema,
  type ApiParams,
  type Filters,
  type QueryOptions,
}
