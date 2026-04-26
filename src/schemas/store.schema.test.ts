import { describe, expect, it } from 'vitest'

import { MODES, StorageSchema } from './store.schema'

const validInput = { version: 1, state: { mode: 'light' as const } }

describe('StorageSchema', () => {
  it('parses a valid object', () => {
    expect(StorageSchema.parse(validInput)).toEqual(validInput)
  })

  it.each(MODES)('accepts mode "%s"', (mode) => {
    expect(() =>
      StorageSchema.parse({ ...validInput, state: { mode } }),
    ).not.toThrow()
  })

  it('rejects an invalid mode', () => {
    expect(() =>
      StorageSchema.parse({ ...validInput, state: { mode: 'auto' } }),
    ).toThrow()
  })

  it('rejects missing state', () => {
    const { state: _, ...rest } = validInput
    expect(() => StorageSchema.parse(rest)).toThrow()
  })

  it('rejects missing state.mode', () => {
    expect(() => StorageSchema.parse({ ...validInput, state: {} })).toThrow()
  })
})
