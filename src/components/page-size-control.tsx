import {
  SelectValue,
  SelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { PER_PAGE_OPTIONS, type Filters } from '@/schemas'
import { useFiltersActions, usePaginationFilters, usePerPage } from '@/store'
import { cn } from '@/utilities'

function PaginationRangeDisplay({
  className,
  totalItems,
  ...props
}: React.ComponentProps<'p'> & {
  totalItems: number
}) {
  const { page, perPage } = usePaginationFilters()

  return (
    <p
      className={cn(
        'text-muted-foreground min-w-28 whitespace-nowrap lg:min-w-60',
        className,
      )}
      {...props}
    >
      <span className="hidden lg:inline">Showing</span>{' '}
      {perPage * (page - 1) + 1} - {Math.min(page * perPage, totalItems)} of{' '}
      {totalItems} <span className="hidden lg:inline">pokemons</span>
    </p>
  )
}

function PageSizePicker({
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

type PageSizeControlProps = React.ComponentProps<'div'> & {
  disabled?: boolean
  startTransition: React.TransitionStartFunction
  totalItems: number
}
export default function PageSizeControl({
  className,
  disabled,
  startTransition,
  totalItems,
  ...props
}: PageSizeControlProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <div className="flex items-center justify-center gap-2">
        <p className="hidden whitespace-nowrap lg:block">Per page:</p>
        <PageSizePicker disabled={disabled} startTransition={startTransition} />
      </div>

      <Separator
        orientation="vertical"
        className="h-6 data-vertical:self-center"
      />

      <PaginationRangeDisplay totalItems={totalItems} />
    </div>
  )
}
