import { cn } from '@/shared/lib/utils'
import { usePaginationFilters } from '@/shared/store'

export function PaginationRangeDisplay({
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
