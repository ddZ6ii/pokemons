import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import debounce from './debounce'

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

describe('trailing (default)', () => {
  it('calls fn after delay', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { delay: 200 })

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('resets timer on each call, only fires once', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { delay: 200 })

    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()
    vi.advanceTimersByTime(100)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('passes latest args to fn', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { delay: 200 })

    debouncedFn('first')
    debouncedFn('second')
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledWith('second')
  })
})

describe('leading', () => {
  it('calls fn immediately on first call', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { edge: 'leading', delay: 200 })

    debouncedFn()
    expect(fn).toHaveBeenCalledOnce()
  })

  it('ignores subsequent calls within delay', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { edge: 'leading', delay: 200 })

    debouncedFn()
    debouncedFn()
    debouncedFn()
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledOnce()
  })

  it('fires again after delay has passed', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { edge: 'leading', delay: 200 })

    debouncedFn()
    vi.advanceTimersByTime(200)
    debouncedFn()

    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('cancel', () => {
  it('prevents pending trailing call', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { delay: 200 })

    debouncedFn()
    debouncedFn.cancel()
    vi.advanceTimersByTime(200)

    expect(fn).not.toHaveBeenCalled()
  })

  it('is safe to call when no timer is pending', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { delay: 200 })

    expect(() => {
      debouncedFn.cancel()
    }).not.toThrow()
  })

  it('allows new calls after cancellation', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, { delay: 200 })

    debouncedFn()
    debouncedFn.cancel()
    debouncedFn()
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledOnce()
  })
})
