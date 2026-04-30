import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationProps = React.ComponentProps<'div'> & {
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
  return (
    <div className={className} {...props}>
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
    </div>
  )
}
