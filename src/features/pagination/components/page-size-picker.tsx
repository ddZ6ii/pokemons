import { PER_PAGE_OPTIONS, type Filters } from '@/features/filters/schemas'
import {
  SelectValue,
  SelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import { useFiltersActions, usePerPage } from '@/shared/store'

export function PageSizePicker({
  className,
  disabled,
  startTransition,
  ...props
}: React.ComponentProps<typeof SelectTrigger> & {
  startTransition: React.TransitionStartFunction
}) {
  const perPage = usePerPage()
  const { setPerPage } = useFiltersActions()

  const handlePerPageChange = (nextPerPage: Filters['perPage']) => {
    startTransition(() => {
      setPerPage(nextPerPage)
    })
  }

  return (
    <Select
      value={String(perPage)}
      onValueChange={(nextPerPage) => {
        handlePerPageChange(Number(nextPerPage) as Filters['perPage'])
      }}
    >
      <SelectTrigger
        disabled={disabled}
        size="sm"
        className={cn('w-full max-w-17', className)}
        {...props}
      >
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>
      <SelectContent align="start" position="popper">
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
