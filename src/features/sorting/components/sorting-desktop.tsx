import { useTransition } from 'react'

import { SortingControls } from '@/features/sorting/components/sorting-controls'
import { useFiltersActions, useSortFilters } from '@/shared/store'

type SortingDesktopProps = {
  className?: string
}

export function SortingDesktop({ className }: SortingDesktopProps) {
  const [isPending, startTransition] = useTransition()
  const { sortBy, sortOrder } = useSortFilters()
  const { setSorting } = useFiltersActions()

  return (
    <SortingControls
      disabled={isPending}
      className={className}
      selectedSortBy={sortBy}
      selectedOrderBy={sortOrder}
      onSortBySelect={(nextSortBy) => {
        const nextSortOrder = nextSortBy && (sortOrder ?? 'asc')
        startTransition(() => {
          setSorting(nextSortBy, nextSortOrder)
        })
      }}
      onSortOrderSelect={(nextSortOrder) => {
        startTransition(() => {
          setSorting(sortBy, nextSortOrder)
        })
      }}
    />
  )
}
