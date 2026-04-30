import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

import { StorageSchema } from '@/schemas'
import { createModeSlice, type ModeSlice } from '@/store/mode-slice'
import { createFilterSlice, type FilterSlice } from '@/store/filters-slice'
import { toggleMode } from '@/utilities'

type StoreState = ModeSlice & FilterSlice

const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createModeSlice(...a),
      ...createFilterSlice(...a),
    }),
    {
      name: 'pokedex-store',
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          return { ...(persistedState as object), perPage: 10 }
        }
        return persistedState
      },
      // Custom storage adapter to extend base implementation with runtime validation (null → falls back to initialState)
      storage: createJSONStorage(() => ({
        // Default local storage meethods (keeps the `this` context)
        setItem: localStorage.setItem.bind(localStorage),
        removeItem: localStorage.removeItem.bind(localStorage),
        // Override `getItem` to add runtime validation
        getItem: (name) => {
          const stored = localStorage.getItem(name)
          if (!stored) return null
          const result = StorageSchema.safeParse(JSON.parse(stored))
          return result.success ? stored : null
        },
      })),
      // Only persist a subset of the store state:
      // - `page` is transient (-> not persisted)
      // - `isDarkMode` is derived from mode + current system preference (-> not persisted)
      partialize: (state) => ({
        mode: state.mode,
        perPage: state.perPage,
      }),
      // Recompute `isDarkMode` on rehydration (sync, before first paint) to avoid a flash of the wrong theme on load.
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

// Mode slice selectors
const useMode = () => useStore((state) => state.mode)
const useIsDarkMode = () => useStore((state) => state.isDarkMode)
const useModeActions = () => useStore((state) => state.modeActions)

// Filter slice selectors
const usePage = () => useStore((state) => state.page)
const usePerPage = () => useStore((state) => state.perPage)
const useFilters = () =>
  useStore(
    useShallow((state) => ({ page: state.page, perPage: state.perPage })),
  )
const useFiltersActions = () => useStore((state) => state.filterActions)

export {
  useIsDarkMode,
  useMode,
  useModeActions,
  usePage,
  usePerPage,
  useFilters,
  useFiltersActions,
}
