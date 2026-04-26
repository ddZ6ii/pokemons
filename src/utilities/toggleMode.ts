import type { Mode } from '@/schemas'
import { getSystemPreference } from '@/utilities'

export default function toggleMode(mode: Mode) {
  const htmlEl = document.querySelector('html')

  if (!htmlEl) return

  const isDarkMode =
    mode === 'dark' || (mode === 'system' && getSystemPreference() === 'dark')

  htmlEl.classList.toggle('dark', isDarkMode)
}
