import { ArrowUpDownIcon } from 'lucide-react'

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

export default function Sorting({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <SortingDrawer />
      ) : (
        <SortingControls className={className} {...props} />
      )}
    </>
  )
}

function SortingControls({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('', className)} {...props}>
      Sorting
    </div>
  )
}

function SortingDrawer({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Drawer>
      <WithTooltip message="Show sorting options">
        <DrawerTrigger asChild>
          <Button
            aria-label="Show sorting options"
            variant="outline"
            className={cn('', className)}
            {...props}
          >
            <ArrowUpDownIcon aria-hidden={true} />
          </Button>
        </DrawerTrigger>
      </WithTooltip>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Sorting Options</DrawerTitle>
            <DrawerDescription>
              You can choose multiple sorting criteria and order of application.
            </DrawerDescription>
          </DrawerHeader>

          <SortingControls className="flex flex-col p-4" />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={() => {
                  console.log('🚧 apply filters...')
                }}
              >
                Apply
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  console.log('🚧 reset filters...')
                }}
              >
                Reset
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
