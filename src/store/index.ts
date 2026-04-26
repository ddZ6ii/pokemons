import { create } from 'zustand'

import { createModeSlice, type ModeSlice } from '@/store/mode-slice'
import { persist } from 'zustand/middleware'
import { toggleMode } from '@/utilities'

type StoreState = ModeSlice

const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createModeSlice(...a),
    }),
    {
      name: 'pokemons-store',
      partialize: (state) => ({
        mode: state.mode,
      }),
      // isDarkMode is intentionally not persisted — it's derived from mode + current system preference.
      // Persisting it would cause stale values when mode is 'system' and the OS theme changed between sessions.
      // Recomputing here (sync, before first paint) also avoids a flash of the wrong theme on load.
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const isDarkMode =
          state.mode === 'dark' ||
          (state.mode === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        state.isDarkMode = isDarkMode
        toggleMode(state.mode)
      },
    },
  ),
)

const useMode = () => useStore((state) => state.mode)
const useIsDarkMode = () => useStore((state) => state.isDarkMode)
const useModeActions = () => useStore((state) => state.actions)

export { useIsDarkMode, useMode, useModeActions, useStore }
