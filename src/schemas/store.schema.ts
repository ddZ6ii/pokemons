import z from 'zod'

import { FilterSchema, ModeSchema } from '@/schemas'

const StorageSchema = z.object({
  version: z.number(),
  state: z.object({
    mode: ModeSchema,
    ...FilterSchema.pick({ perPage: true, sortBy: true, sortOrder: true })
      .shape,
  }),
})

type PersistedStoreState = z.infer<typeof StorageSchema>

export { type PersistedStoreState, StorageSchema }
