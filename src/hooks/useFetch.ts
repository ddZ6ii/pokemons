import { useCallback, useEffect, useEffectEvent, useState } from 'react'

import { isAbortError } from '@/utilities'

export default function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  key?: string | number,
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [reloadIndex, setReloadIndex] = useState(0)

  const refetch = useCallback(() => {
    setReloadIndex((i) => i + 1)
  }, [])

  const runFetch = useEffectEvent((controller: AbortController) => {
    if (error !== null) {
      setData(null)
    }
    setError(null)
    setLoading(true)

    fetcher(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result)
      })
      .catch((err: unknown) => {
        // isAbortError guard prevents setting error state on intentional aborts
        if (!controller.signal.aborted && !isAbortError(err))
          setError(err as Error)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
  })

  useEffect(() => {
    const controller = new AbortController()
    runFetch(controller)
    return () => {
      controller.abort()
    }
  }, [reloadIndex, key])

  return { data, loading, error, refetch } as const
}
