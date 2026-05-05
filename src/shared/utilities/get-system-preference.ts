import type { Mode } from '@/shared/schemas'

export function getSystemPreference(): Mode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
