import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import useFetch from './useFetch'

describe('useFetch', () => {
  it('starts in loading state with no data or error', () => {
    // Intentionall keeps the promise pending (the fetcher never resolves)
    const fetcher = vi.fn(() => new Promise((_resolve) => undefined))
    const { result } = renderHook(() => useFetch(fetcher))
    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('sets data and clears loading on success', async () => {
    const fetcher = vi.fn().mockResolvedValue(['pikachu'])
    const { result } = renderHook(() => useFetch(fetcher))
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.data).toEqual(['pikachu'])
    expect(result.current.error).toBeNull()
  })

  it('sets error and clears loading on rejection', async () => {
    const err = new Error('network failure')
    const fetcher = vi.fn().mockRejectedValue(err)
    const { result } = renderHook(() => useFetch(fetcher))
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.error).toBe(err)
    expect(result.current.data).toBeNull()
  })

  it('does not set error on abort rejection', async () => {
    const abortError = new DOMException('Aborted', 'AbortError')
    const fetcher = vi.fn().mockRejectedValue(abortError)
    const { result } = renderHook(() => useFetch(fetcher))
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.error).toBeNull()
  })

  it('keeps stale data and re-fetches on refetch()', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(['pikachu'])
      .mockResolvedValueOnce(['bulbasaur'])
    const { result } = renderHook(() => useFetch(fetcher))
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.data).toEqual(['pikachu'])

    act(() => {
      result.current.refetch()
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toEqual(['pikachu'])
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.data).toEqual(['bulbasaur'])
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('aborts the in-flight request signal on unmount', () => {
    let capturedSignal!: AbortSignal
    const fetcher = vi.fn((signal: AbortSignal) => {
      capturedSignal = signal
      return new Promise((_resolve) => undefined)
    })
    const { unmount } = renderHook(() => useFetch(fetcher))
    expect(capturedSignal.aborted).toBe(false)
    unmount()
    expect(capturedSignal.aborted).toBe(true)
  })
})
