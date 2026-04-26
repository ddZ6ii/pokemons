import z from 'zod'

const MODES = ['light', 'dark', 'system'] as const

const ModeSchema = z.enum(MODES)

const StorageSchema = z.object({
  version: z.number(),
  state: z.object({
    mode: ModeSchema,
  }),
})

type Mode = z.infer<typeof ModeSchema>

export { type Mode, MODES, StorageSchema }
