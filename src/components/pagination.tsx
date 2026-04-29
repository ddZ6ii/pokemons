import { motion, type Variants } from 'motion/react'

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
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

type PaginationProps = React.ComponentProps<typeof motion.div> & {
  disabled: boolean
  page: number
  maxDisplayedPages?: number
  maxPage: number
  onPageChange: (nextPage: number) => void
  onPageHover: (nextPage: number) => void
}

export default function Pagination({
  className,
  disabled,
  page,
  maxDisplayedPages = 3,
  maxPage,
  onPageChange,
  onPageHover,
  ...props
}: PaginationProps) {
  const hidden = useScrollVisibility(0.95, 'up', true)

  return (
    <motion.div
      className={cn(
        'sticky bottom-4 z-10 rounded-lg px-4 py-2 backdrop-blur-sm',
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
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page <= 1 || disabled}
              onClick={() => {
                onPageChange(page - 1)
              }}
              onMouseEnter={() => {
                if (page > 1) {
                  onPageHover(page - 1)
                }
              }}
            />
          </PaginationItem>

          {Array.from({
            length: maxDisplayedPages,
          }).map((_, index) => {
            const pageNumber =
              page + maxDisplayedPages - 1 < maxPage
                ? index + page
                : Math.max(1, maxPage - maxDisplayedPages + 1) + index

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  disabled={disabled}
                  isActive={page === pageNumber}
                  onClick={() => {
                    onPageChange(pageNumber)
                  }}
                  onMouseEnter={() => {
                    if (pageNumber !== page) {
                      onPageHover(pageNumber)
                    }
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          {page + maxDisplayedPages - 1 < maxPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={page >= maxPage || disabled}
              onClick={() => {
                onPageChange(page + 1)
              }}
              onMouseEnter={() => {
                if (page < maxPage) {
                  onPageHover(page + 1)
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </motion.div>
  )
}
