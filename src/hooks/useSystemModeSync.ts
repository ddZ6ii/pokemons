import { useEffect, useSyncExternalStore } from 'react'

import { useMode } from '@/store'
import { toggleMode } from '@/utilities'

const media = window.matchMedia('(prefers-color-scheme: dark)')

/**
 * Registers a listener for browser-level color scheme changes.
 * React provides the callback — no side effects should happen here.
 *
 * @param callback - Fired by React when the media query result changes.
 * @returns Cleanup function that removes the listener.
 */
function subscribe(callback: () => void) {
  media.addEventListener('change', callback)
  return () => {
    media.removeEventListener('change', callback)
  }
}

/**
 * Returns whether the OS is currently in dark mode.
 * Called during render and after each change notification.
 */
function getSnapshot() {
  return media.matches
}

/**
 * Keeps the app's color mode in sync with the OS preference when the
 * active mode is `"system"`. Re-runs whenever the mode setting or the
 * OS preference changes.
 */
export default function useSystemModeSync() {
  const mode = useMode()
  const systemPreference = useSyncExternalStore(subscribe, getSnapshot)

  useEffect(() => {
    if (mode === 'system') {
      toggleMode('system')
    }
  }, [mode, systemPreference])
}
