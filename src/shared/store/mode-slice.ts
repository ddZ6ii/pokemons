import { type StateCreator } from 'zustand'

import { type Mode } from '@/shared/schemas'
import { getSystemPreference, toggleMode } from '@/shared/utilities'

type ModeState = {
  mode: Mode
  isDarkMode: boolean
}
type ModeActions = {
  modeActions: {
    setMode: (nextMode: Mode) => void
  }
}
type ModeSlice = ModeState & ModeActions

const createModeSlice: StateCreator<ModeSlice, [], [], ModeSlice> = (set) => ({
  // Initial default value (overriden by persisted value if it exists)
  mode: 'system',
  isDarkMode: getSystemPreference() === 'dark',
  modeActions: {
    setMode: (mode) => {
      const isDarkMode =
        mode === 'dark' ||
        (mode === 'system' && getSystemPreference() === 'dark')

      set({ mode, isDarkMode })
      toggleMode(mode)
    },
  },
})

export { createModeSlice, type ModeSlice }
