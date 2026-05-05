import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getSystemPreference } from '@/shared/utilities/get-system-preference'
import { toggleMode } from '@/shared/utilities/toggle-mode'

vi.mock('@/shared/utilities/get-system-preference', () => ({
  getSystemPreference: vi.fn(),
}))

describe('toggleMode', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    vi.mocked(getSystemPreference).mockReturnValue('light')
  })

  it('adds dark class when mode is "dark"', () => {
    toggleMode('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when mode is "light"', () => {
    document.documentElement.classList.add('dark')
    toggleMode('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('adds dark class when mode is "system" and system preference is dark', () => {
    vi.mocked(getSystemPreference).mockReturnValue('dark')
    toggleMode('system')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when mode is "system" and system preference is light', () => {
    document.documentElement.classList.add('dark')
    toggleMode('system')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('is idempotent: calling twice with "dark" keeps dark class', () => {
    toggleMode('dark')
    toggleMode('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('is idempotent: calling twice with "light" keeps dark class removed', () => {
    toggleMode('light')
    toggleMode('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
