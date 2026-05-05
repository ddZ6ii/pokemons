import { PaginationRangeDisplay } from '@/features/pagination/components/pagination-range-display'
import { PageSizePicker } from '@/features/pagination/components/page-size-picker'
import { Separator } from '@/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'

type PageSizeControlProps = React.ComponentProps<'div'> & {
  disabled?: boolean
  startTransition: React.TransitionStartFunction
  totalItems: number
}

export function PageSizeControl({
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
