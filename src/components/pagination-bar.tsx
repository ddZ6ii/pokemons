import { motion, type Variants } from 'motion/react'

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
  disabled: boolean
  maxPage: number
  page: number
  perPage: number
  onPageChange: (nextPage: number) => void
  onPageHover: (nextPage: number) => void
  onPerPageChange: (nextPerPage: number) => void
}

export default function PaginationBar({
  className,
  disabled,
  maxPage,
  page,
  perPage,
  onPageChange,
  onPageHover,
  onPerPageChange,
  ...props
}: PaginationBarProps) {
  const hidden = useScrollVisibility(0.95, 'up', true)

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
          disabled={disabled}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
        />
      </div>

      <Separator
        orientation="vertical"
        className="ml-3 h-6 data-vertical:self-center"
      />

      <Pagination
        disabled={disabled}
        page={page}
        maxPage={maxPage}
        maxDisplayedPages={5}
        onPageChange={onPageChange}
        onPageHover={onPageHover}
      />
    </motion.div>
  )
}
