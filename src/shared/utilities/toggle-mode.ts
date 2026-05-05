import type { Mode } from '@/shared/schemas'
import { getSystemPreference } from '@/shared/utilities'

export function toggleMode(mode: Mode) {
  const htmlEl = document.querySelector('html')

  if (!htmlEl) return

  const isDarkMode =
    mode === 'dark' || (mode === 'system' && getSystemPreference() === 'dark')

  htmlEl.classList.toggle('dark', isDarkMode)
}
