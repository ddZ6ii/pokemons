import z from 'zod'

import { POKEMON_SKILLS } from './pokemon.schema'
import type { SelectOption } from '@/types'

const PER_PAGE_OPTIONS = ['10', '20', '50', '100'] as const
const SORT_BY_VALUES = ['name', ...POKEMON_SKILLS] as const
const SORT_ORDER_VALUES = ['asc', 'desc'] as const

const SORT_BY_OPTIONS = [
  {
    group: 'general',
    label: 'Name',
    value: 'name',
  },
  {
    group: 'stats',
    label: 'HP',
    value: 'hp',
  },
  {
    group: 'stats',
    label: 'Attack',
    value: 'attack',
  },
  {
    group: 'stats',
    label: 'Defense',
    value: 'defense',
  },
  {
    group: 'stats',
    label: 'Speed',
    value: 'speed',
  },
] satisfies SelectOption<(typeof SORT_BY_VALUES)[number]>[]
const SORT_ORDER_OPTIONS = [
  {
    group: 'direction',
    label: 'Ascending',
    value: 'asc',
  },
  {
    group: 'direction',
    label: 'Descending',
    value: 'desc',
  },
] satisfies SelectOption<(typeof SORT_ORDER_VALUES)[number]>[]

const FilterSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z
    .union([z.literal(10), z.literal(20), z.literal(50), z.literal(100)])
    .default(10),
  search: z.string().optional(),
  sortBy: z.enum(SORT_BY_VALUES).nullable().default(null),
  sortOrder: z.enum(SORT_ORDER_VALUES).nullable().default(null),
})

const APIParamsSchema = FilterSchema.optional().transform((input) => {
  const { page, perPage, search, sortBy, sortOrder } = FilterSchema.parse(
    input ?? {},
  )
  return {
    _page: page.toString(),
    _per_page: perPage.toString(),
    ...(search && { 'name:contains': search }),
    //By defaultjson-server sorts by id in ascending order (numeric IDs are stringified)
    ...(sortBy && {
      _sort: !sortOrder || sortOrder === 'asc' ? sortBy : `-${sortBy}`,
    }),
  }
})

type ApiParams = z.output<typeof APIParamsSchema>
type Filters = z.infer<typeof FilterSchema>
type QueryOptions = z.input<typeof APIParamsSchema>
type SelectSortByOptions = (typeof SORT_BY_VALUES)[number]
type SelectSortOrderOptions = (typeof SORT_ORDER_VALUES)[number]

export {
  APIParamsSchema,
  FilterSchema,
  PER_PAGE_OPTIONS,
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
  type ApiParams,
  type Filters,
  type QueryOptions,
  type SelectSortByOptions,
  type SelectSortOrderOptions,
}
