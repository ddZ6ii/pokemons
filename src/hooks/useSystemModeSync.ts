import { useEffect, useSyncExternalStore } from 'react'

import { useMode } from '@/store'
import { toggleMode } from '@/utilities'

const media = window.matchMedia('(prefers-color-scheme: dark)')

// Only define what changes to listen for.
// React passes its own callback that will be automatically fired when the source changes, and will trigger a re-render.
// Should not perform any side effects.
function subscribe(callback: () => void) {
  media.addEventListener('change', callback)
  return () => {
    media.removeEventListener('change', callback)
  }
}

// How to read the current value of the source.
// Called during render, after the callback fires.
function getSnapshot() {
  return media.matches
}

export default function useSystemModeSync() {
  const mode = useMode()
  const systemPreference = useSyncExternalStore(subscribe, getSnapshot)

  useEffect(() => {
    if (mode === 'system') {
      toggleMode('system')
    }
  }, [mode, systemPreference])
}
