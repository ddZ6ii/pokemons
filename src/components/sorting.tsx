import { ArrowUpDownIcon } from 'lucide-react'
import { useState, useTransition } from 'react'

import { FilterSelect, WithTooltip } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from '@/components/ui/field'
import { useIsMobile } from '@/hooks'
import {
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
  type SelectSortByOptions,
  type SelectSortOrderOptions,
} from '@/schemas'
import { useFiltersActions, useSortFilters } from '@/store'
import { capitalize, cn } from '@/utilities'

type SortingProps = {
  className?: string
}
export default function Sorting({ className }: SortingProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <SortingMobile className={className} />
  }
  return <SortingDesktop className={className} />
}

type SortingDesktopProps = {
  className?: string
}
function SortingDesktop({ className }: SortingDesktopProps) {
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

type SortingMobileProps = {
  className?: string
}
function SortingMobile({ className }: SortingMobileProps) {
  const { sortBy, sortOrder } = useSortFilters()
  const { setSorting, resetSorting } = useFiltersActions()

  const [selectedSortBy, setSelectedSortBy] =
    useState<SelectSortByOptions | null>(sortBy)

  const [selectedOrderBy, setSelectedOrderBy] =
    useState<SelectSortOrderOptions | null>(sortBy == null ? null : sortOrder)

  const handleSelectSortBy = (nextSortBy: SelectSortByOptions | null) => {
    setSelectedSortBy(nextSortBy)
    // If sortBy is being cleared, also clear orderBy. Otherwise, if orderBy is not already set, default it to 'asc'.
    setSelectedOrderBy(nextSortBy == null ? null : (selectedOrderBy ?? 'asc'))
  }

  const handleSelectSortOrder = (
    nextSortOrder: SelectSortOrderOptions | null,
  ) => {
    setSelectedOrderBy(nextSortOrder)
  }

  const handleApplySorting = () => {
    setSorting(selectedSortBy, selectedOrderBy ?? 'asc')
  }

  const handleDiscardDraft = () => {
    setSelectedSortBy(sortBy)
    setSelectedOrderBy(sortBy == null ? null : sortOrder)
  }

  const handleResetSorting = () => {
    setSelectedSortBy(null)
    setSelectedOrderBy(null)
    resetSorting()
  }

  const hasSortingApplied = sortBy !== null

  return (
    <SortingDrawer
      onApply={handleApplySorting}
      onDrawerClose={handleDiscardDraft}
      onReset={handleResetSorting}
      className={cn(
        hasSortingApplied && 'text-foreground! bg-primary!',
        className,
      )}
    >
      <SortingControls
        className="p-4"
        selectedSortBy={selectedSortBy}
        selectedOrderBy={selectedOrderBy}
        onSortBySelect={handleSelectSortBy}
        onSortOrderSelect={handleSelectSortOrder}
      />
    </SortingDrawer>
  )
}

type SortingDrawerProps = {
  className?: string
  children?: React.ReactNode
  onApply?: () => void
  onDrawerClose?: () => void
  onReset?: () => void
}
function SortingDrawer({
  className,
  onApply,
  onDrawerClose,
  onReset,
  children,
}: SortingDrawerProps) {
  return (
    <Drawer onClose={onDrawerClose}>
      <WithTooltip message="Show sorting options">
        <DrawerTrigger asChild>
          <Button
            aria-label="Show sorting options"
            variant="outline"
            size="icon-md"
            className={className}
          >
            <ArrowUpDownIcon aria-hidden={true} />
          </Button>
        </DrawerTrigger>
      </WithTooltip>

      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Sorting Options</DrawerTitle>
            <DrawerDescription>
              Choose a field to sort by and a direction.
            </DrawerDescription>
          </DrawerHeader>

          {children}

          <DrawerFooter className="mx-auto max-w-sm sm:max-w-lg sm:flex-row">
            <DrawerClose asChild>
              <Button
                className="sm:flex-1"
                onClick={() => {
                  onApply?.()
                }}
              >
                Apply
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="sm:flex-1"
                onClick={() => {
                  onReset?.()
                }}
              >
                Reset
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

type SortingControlsProps = React.ComponentProps<'div'> & {
  disabled?: boolean
  className?: string
  onSortBySelect: (sortBy: SelectSortByOptions | null) => void
  onSortOrderSelect: (sortOrder: SelectSortOrderOptions | null) => void
  selectedSortBy: SelectSortByOptions | null
  selectedOrderBy: SelectSortOrderOptions | null
}
function SortingControls({
  className,
  disabled,
  onSortBySelect,
  onSortOrderSelect,
  selectedSortBy,
  selectedOrderBy,
}: SortingControlsProps) {
  return (
    <FieldSet
      disabled={disabled}
      className={cn('mx-auto max-w-sm sm:max-w-lg', className)}
    >
      <FieldGroup>
        <Field orientation="responsive">
          <FilterSelect
            id="sort-by"
            label="Sort by:"
            placeholder="Select sorting criteria"
            wrapperClassName="flex-2"
            className={cn(selectedSortBy !== null && 'lg:border-primary')}
            clearableSelection
            options={SORT_BY_OPTIONS}
            selectedOption={selectedSortBy}
            onOptionSelect={(nextValue) => {
              onSortBySelect(nextValue as SelectSortByOptions | null)
            }}
            renderOption={(label) => capitalize(label)}
          />

          <div className="flex flex-col gap-2">
            <FilterSelect
              id="order-by"
              label="Order by:"
              disabled={selectedSortBy === null}
              placeholder="Select sorting order"
              className={cn(selectedOrderBy !== null && 'lg:border-primary')}
              wrapperClassName="flex-1"
              options={SORT_ORDER_OPTIONS}
              selectedOption={selectedOrderBy}
              onOptionSelect={(nextValue) => {
                onSortOrderSelect(nextValue as SelectSortOrderOptions | null)
              }}
              renderOption={(label) => capitalize(label)}
            />
            {selectedSortBy === null && (
              <FieldDescription className="text-xs">
                Select a sorting criterion first
              </FieldDescription>
            )}
          </div>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
