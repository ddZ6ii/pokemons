import { describe, expect, it } from 'vitest'

import { envSchema } from './env.schema'

describe('envSchema', () => {
  it('accepts a valid port number', () => {
    expect(envSchema.parse(3000)).toBe(3000)
  })

  it('accepts the minimum port (1)', () => {
    expect(envSchema.parse(1)).toBe(1)
  })

  it('accepts the maximum port (65535)', () => {
    expect(envSchema.parse(65535)).toBe(65535)
  })

  it('coerces a numeric string to a number', () => {
    expect(envSchema.parse('3000')).toBe(3000)
  })

  it('rejects port 0', () => {
    expect(() => envSchema.parse(0)).toThrow()
  })

  it('rejects port 65536', () => {
    expect(() => envSchema.parse(65536)).toThrow()
  })

  it('rejects a non-integer port', () => {
    expect(() => envSchema.parse(3000.5)).toThrow()
  })

  it('rejects a non-numeric string', () => {
    expect(() => envSchema.parse('abc')).toThrow()
  })
})
