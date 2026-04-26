import type { Mode } from '@/schemas'

export default function getSystemPreference(): Mode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
