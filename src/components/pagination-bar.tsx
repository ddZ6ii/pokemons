import { motion, type Variants } from 'motion/react'
import { useTransition } from 'react'

import { PageSizePicker, Pagination } from '@/components'
import { Separator } from '@/components/ui/separator'
import { useScrollVisibility } from '@/hooks'
import { cn } from '@/utilities'

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: '200%',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

type PaginationBarProps = React.ComponentProps<typeof motion.div> & {
  maxPage: number
}

export default function PaginationBar({
  className,
  maxPage,
  ...props
}: PaginationBarProps) {
  const hidden = useScrollVisibility(0.95, 'up', true)

  // ℹ️ Why useTransition?
  //
  // Problem:
  // useSuspenseQuery unmounts the current UI while fetching:
  // -> jumpy UI alterning between the content and the fallback
  // -> poor UX on each page transition
  //
  // Solution:
  // Show state data while fetching new data in the background:
  // -> prevents the UI from being replaced by a fallback during an update
  // But since `placeholderData` does not exist with useSuspenseQuery:
  // -> wrap the updates that change the QueryKey with React startTransition
  // -> pass isPending state to disable controls until the transition settles
  //
  // Share the same transition state between Pagination and PageSizePicker to disable both controls during any transition
  const [isPending, startTransition] = useTransition()

  return (
    <motion.div
      className={cn(
        'sticky bottom-4 z-10 flex items-center rounded-lg px-4 py-2 text-sm backdrop-blur-sm',
        className,
      )}
      variants={variants}
      initial="hidden"
      animate={hidden ? 'hidden' : 'visible'}
      transition={{
        duration: 0.35,
        ease: 'easeInOut',
      }}
      {...props}
    >
      <div className="flex w-full items-center justify-center gap-2">
        <p className="hidden whitespace-nowrap lg:block">Items per page:</p>
        <PageSizePicker
          disabled={isPending}
          startTransition={startTransition}
        />
      </div>

      <Separator
        orientation="vertical"
        className="ml-3 h-6 data-vertical:self-center"
      />

      <Pagination
        disabled={isPending}
        maxPage={maxPage}
        startTransition={startTransition}
      />
    </motion.div>
  )
}
