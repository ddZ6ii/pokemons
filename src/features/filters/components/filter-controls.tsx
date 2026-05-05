import { cn } from '@/shared/lib/utils'

export function FilterControls({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('bg-blue-300', className)} {...props}>
      Filters
    </div>
  )
}
