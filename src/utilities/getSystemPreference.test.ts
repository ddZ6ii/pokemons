import { beforeAll, describe, expect, it, vi } from 'vitest'
import getSystemPreference from './getSystemPreference'

const makeMediaQuery = (matches: boolean): MediaQueryList => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

describe('getSystemPreference', () => {
  beforeAll(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => makeMediaQuery(false)),
    )
  })
  it('should return "dark" when the user prefers dark mode', () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce(makeMediaQuery(true))
    expect(getSystemPreference()).toBe('dark')
  })

  it('should return "light" when the user prefers light mode', () => {
    // setup.ts mock returns matches: false by default
    expect(getSystemPreference()).toBe('light')
  })

  it('should query the correct media feature', () => {
    getSystemPreference()
    expect(window.matchMedia).toHaveBeenCalledWith(
      '(prefers-color-scheme: dark)',
    )
  })
})
