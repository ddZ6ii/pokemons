import { TrashIcon } from 'lucide-react'

import { FieldContent, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SelectOption } from '@/types'
import { capitalize, cn } from '@/utilities'

const NO_SELECTION = '__none__'

type FilterSelectProps<T extends string> = React.ComponentProps<
  typeof SelectTrigger
> & {
  clearableSelection?: boolean
  label?: string
  onSelectionClear?: () => void
  onOptionSelect: (value: SelectOption<T>['value'] | null) => void
  options: SelectOption<T>[]
  placeholder?: string
  renderOption: (option: SelectOption<T>['label']) => React.ReactNode
  selectedOption?: SelectOption<T>['value'] | null
  wrapperClassName?: string
}

export default function FilterSelect<T extends string>({
  clearableSelection = false,
  className,
  label,
  placeholder = 'Select an option',
  onOptionSelect,
  options,
  renderOption,
  selectedOption,
  wrapperClassName,
  ...props
}: FilterSelectProps<T>) {
  const selectOptions: React.ReactNode[] = []
  let currentGroup: string | null | undefined = null

  for (const option of options) {
    if (option.group !== currentGroup) {
      const newGroup = option.group ?? 'other'
      if (currentGroup !== null) {
        selectOptions.push(<SelectSeparator key={`separator-${newGroup}`} />)
      }
      selectOptions.push(
        <SelectLabel key={`label-${newGroup}`}>
          {capitalize(newGroup)}
        </SelectLabel>,
      )
      currentGroup = option.group
    }
    selectOptions.push(
      <SelectItem key={option.value} value={option.value}>
        {renderOption(option.label)}
      </SelectItem>,
    )
  }

  const showClearSelection = clearableSelection && selectedOption != null

  return (
    <FieldContent className={cn('w-full', wrapperClassName)}>
      {label && (
        <FieldLabel htmlFor={props.id} className="whitespace-nowrap">
          {label}
        </FieldLabel>
      )}
      <Select
        value={selectedOption ?? ''}
        onValueChange={(nextValue) => {
          onOptionSelect(
            nextValue === NO_SELECTION
              ? null
              : (nextValue as SelectOption<T>['value']),
          )
        }}
      >
        <SelectTrigger
          aria-label={placeholder}
          className={cn('w-full lg:w-[unset] lg:flex-1', className)}
          {...props}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectGroup>
            {selectOptions}
            {showClearSelection && (
              <>
                <SelectSeparator />
                <SelectItem
                  value={NO_SELECTION}
                  className="bg-primary hover:bg-primary/80!"
                >
                  <TrashIcon className="size-3" /> Clear selection
                </SelectItem>
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldContent>
  )
}
