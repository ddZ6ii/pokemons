import z from 'zod'

const MODES = ['light', 'dark', 'system'] as const

const ModeSchema = z.enum(MODES).default('system')

type Mode = z.infer<typeof ModeSchema>

export { MODES, ModeSchema, type Mode }
