import { ListFilterIcon } from 'lucide-react'

import { WithTooltip } from '@/components'
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
import { useIsMobile } from '@/hooks'
import { cn } from '@/utilities'

export default function Filtering({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <FiltersDrawer />
      ) : (
        <FilterControls className={className} {...props} />
      )}
    </>
  )
}

function FilterControls({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('bg-blue-300', className)} {...props}>
      Filters
    </div>
  )
}

function FiltersDrawer({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Drawer>
      <WithTooltip message="Show filters">
        <DrawerTrigger asChild>
          <Button
            aria-label="Show filters"
            variant="outline"
            className={cn('', className)}
            {...props}
          >
            <ListFilterIcon aria-hidden={true} />
          </Button>
        </DrawerTrigger>
      </WithTooltip>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Search Filters</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Clear All Filters</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
