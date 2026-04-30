type DebounceOptions = {
  edge?: 'leading' | 'trailing'
  delay?: number
}

/**
 * Returns a debounced version of `cbFn` that delays invocation until after
 * `delay` ms have elapsed since the last call.
 *
 * @param cbFn - The function to debounce.
 * @param options - Configuration options.
 * @param options.edge - `'leading'` fires on the first call then suppresses
 *   subsequent calls until the timer expires; `'trailing'` (default) fires
 *   after the last call once the timer expires.
 * @param options.delay - Quiet period in milliseconds (default `1000`).
 * @returns The debounced function, with a `.cancel()` method to abort any
 *   pending invocation.
 */
export default function debounce<Args extends unknown[]>(
  cbFn: (...args: Args) => void,
  options: DebounceOptions = {},
) {
  const { edge = 'trailing', delay = 1000 } = options

  let id: ReturnType<typeof setTimeout> | null = null

  function cancel() {
    if (id !== null) {
      clearTimeout(id)
      id = null
    }
  }

  function debounced(...args: Args) {
    if (edge === 'leading') {
      if (id === null) {
        cbFn(...args)
        id = setTimeout(() => {
          id = null
        }, delay)
      }
    } else {
      if (id !== null) {
        clearTimeout(id)
      }
      id = setTimeout(() => {
        id = null
        cbFn(...args)
      }, delay)
    }
  }

  debounced.cancel = cancel
  return debounced
}
