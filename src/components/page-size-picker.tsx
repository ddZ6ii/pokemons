import {
  SelectValue,
  SelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select'
import { PER_PAGE_OPTIONS, type Filters } from '@/schemas'
import { useFiltersActions, usePerPage } from '@/store'
import { cn } from '@/utilities'

type PageSizePickerProps = React.ComponentProps<typeof SelectTrigger> & {
  startTransition: React.TransitionStartFunction
}

export default function PageSizePicker({
  className,
  disabled,
  startTransition,
  ...props
}: PageSizePickerProps) {
  const perPage = usePerPage()
  const { setPerPage } = useFiltersActions()

  const handlePerPageChange = (nextPerPage: Filters['perPage']) => {
    startTransition(() => {
      setPerPage(nextPerPage)
    })
  }

  return (
    <Select
      value={perPage.toString()}
      onValueChange={(nextPerPage) => {
        handlePerPageChange(Number(nextPerPage) as Filters['perPage'])
      }}
    >
      <SelectTrigger
        disabled={disabled}
        className={cn('w-full max-w-17', className)}
        {...props}
      >
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items per page</SelectLabel>
          {PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
