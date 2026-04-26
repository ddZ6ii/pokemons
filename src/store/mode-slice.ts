import { type StateCreator } from 'zustand'

import { type Mode } from '@/schemas'
import { getSystemPreference, toggleMode } from '@/utilities'

type StoreState = {
  mode: Mode
  isDarkMode: boolean
}
type StoreActions = {
  actions: {
    setMode: (nextMode: Mode) => void
  }
}
type ModeSlice = StoreState & StoreActions

const createModeSlice: StateCreator<ModeSlice, [], [], ModeSlice> = (set) => ({
  // Initial default value (overriden by persisted value if it exists)
  mode: 'system',
  isDarkMode: getSystemPreference() === 'dark',
  actions: {
    setMode: (mode) => {
      const isDarkMode =
        mode === 'dark' ||
        (mode === 'system' && getSystemPreference() === 'dark')

      set({ mode, isDarkMode })
      toggleMode(mode)
    },
  },
})

export { createModeSlice, type ModeSlice, type StoreState }
