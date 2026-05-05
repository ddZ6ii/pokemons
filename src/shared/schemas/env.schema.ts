import z from 'zod'

export const envSchema = z.coerce.number().int().min(1).max(65535)
