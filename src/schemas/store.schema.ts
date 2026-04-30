import z from 'zod'

const MODES = ['light', 'dark', 'system'] as const
const PER_PAGE_OPTIONS = ['10', '20', '50', '100'] as const

const ModeSchema = z.enum(MODES)

const FilterSchema = z.object({
  page: z.number().int().positive().min(1),
  perPage: z.union([
    z.literal(10),
    z.literal(20),
    z.literal(50),
    z.literal(100),
  ]),
  search: z.string().optional(),
})

const StorageSchema = z.object({
  version: z.number(),
  state: z.object({
    mode: ModeSchema,
    ...FilterSchema.omit({ page: true, search: true }).shape,
  }),
})

type Mode = z.infer<typeof ModeSchema>
type Filters = z.infer<typeof FilterSchema>
type PersistedStoreState = z.infer<typeof StorageSchema>

export {
  type Filters,
  type Mode,
  type PersistedStoreState,
  MODES,
  PER_PAGE_OPTIONS,
  StorageSchema,
}
