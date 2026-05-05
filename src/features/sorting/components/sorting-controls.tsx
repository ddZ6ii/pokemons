import { FilterSelect } from '@/features/filters/components/filter-select'
import {
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
  type SelectSortByOptions,
  type SelectSortOrderOptions,
} from '@/features/filters/schemas'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from '@/shared/components/ui/field'
import { cn } from '@/shared/lib/utils'
import { capitalize } from '@/shared/utilities'

type SortingControlsProps = React.ComponentProps<'div'> & {
  disabled?: boolean
  className?: string
  onSortBySelect: (sortBy: SelectSortByOptions | null) => void
  onSortOrderSelect: (sortOrder: SelectSortOrderOptions | null) => void
  selectedSortBy: SelectSortByOptions | null
  selectedOrderBy: SelectSortOrderOptions | null
}

export function SortingControls({
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
