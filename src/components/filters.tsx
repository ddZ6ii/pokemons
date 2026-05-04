import { Filtering, Search, Sorting } from '@/components'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/utilities'

export default function Filters({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid w-full max-w-78 grid-cols-[1fr_auto] gap-2 md:max-w-162 lg:max-w-none lg:grid-cols-1 lg:gap-6',
        className,
      )}
      {...props}
    >
      <Search
        id="search-pokemon"
        wrapperClassName="mx-auto w-full lg:max-w-sm"
      />

      <div className="flex items-center gap-2">
        <Filtering className="flex-1" />
        <Separator orientation="vertical" className="h-6" />
        <Sorting className="flex-1" />
      </div>
    </div>
  )
}
