import { describe, expect, it } from 'vitest'

import { MODES, ModeSchema } from '@/shared/schemas/mode.schema'

describe('ModeSchema', () => {
  it.each(MODES)('accepts "%s"', (mode) => {
    expect(ModeSchema.parse(mode)).toBe(mode)
  })

  it('defaults undefined to "system"', () => {
    expect(ModeSchema.parse(undefined)).toBe('system')
  })

  it('rejects an unknown value', () => {
    expect(() => ModeSchema.parse('auto')).toThrow()
  })

  it('rejects an empty string', () => {
    expect(() => ModeSchema.parse('')).toThrow()
  })

  it('rejects a number', () => {
    expect(() => ModeSchema.parse(0)).toThrow()
  })

  it('rejects null', () => {
    expect(() => ModeSchema.parse(null)).toThrow()
  })
})

describe('MODES', () => {
  it('contains exactly light, dark, system', () => {
    expect(MODES).toEqual(['light', 'dark', 'system'])
  })
})
