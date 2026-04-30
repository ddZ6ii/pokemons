import { describe, expect, it } from 'vitest'

import {
  MODES,
  PER_PAGE_OPTIONS,
  StorageSchema,
  type PersistedStoreState,
} from './store.schema'

const validInput: PersistedStoreState = {
  version: 1,
  state: { mode: 'light' as const, perPage: 10 as const },
}

describe('StorageSchema', () => {
  it('parses a valid object', () => {
    const result = StorageSchema.safeParse(validInput)
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
    expect(result.data).toEqual(validInput)
  })

  it.each(MODES)('accepts mode "%s"', (mode) => {
    expect(() =>
      StorageSchema.parse({
        ...validInput,
        state: { ...validInput.state, mode },
      }),
    ).not.toThrow()
  })

  it('rejects an invalid mode', () => {
    expect(() =>
      StorageSchema.parse({
        ...validInput,
        state: { ...validInput.state, mode: 'auto' },
      }),
    ).toThrow()
  })

  it.each(PER_PAGE_OPTIONS)('accepts perPage %s', (perPage) => {
    expect(() =>
      StorageSchema.parse({
        ...validInput,
        state: { ...validInput.state, perPage: Number(perPage) },
      }),
    ).not.toThrow()
  })

  it('rejects an invalid perPage', () => {
    expect(() =>
      StorageSchema.parse({
        ...validInput,
        state: { ...validInput.state, perPage: 37 },
      }),
    ).toThrow()
  })

  it('rejects missing state', () => {
    const { state: _, ...rest } = validInput
    expect(() => StorageSchema.parse(rest)).toThrow()
  })

  it('rejects missing state.mode', () => {
    const { mode: _, ...stateWithoutMode } = validInput.state
    expect(() =>
      StorageSchema.parse({ ...validInput, state: stateWithoutMode }),
    ).toThrow()
  })

  it('rejects missing state.perPage', () => {
    const { perPage: _, ...stateWithoutPerPage } = validInput.state
    expect(() =>
      StorageSchema.parse({ ...validInput, state: stateWithoutPerPage }),
    ).toThrow()
  })
})
