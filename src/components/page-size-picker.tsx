import {
  SelectValue,
  SelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select'
import { cn } from '@/utilities'

type PageSizePickerProps = React.ComponentProps<typeof SelectTrigger> & {
  perPage: number
  onPerPageChange: (nextPerPage: number) => void
}

const PER_PAGE_OPTIONS = ['10', '20', '50', '100'] as const

export default function PageSizePicker({
  className,
  perPage,
  onPerPageChange,
  ...props
}: PageSizePickerProps) {
  return (
    <Select
      value={perPage.toString()}
      onValueChange={(nextPerPage) => {
        onPerPageChange(Number(nextPerPage))
      }}
    >
      <SelectTrigger className={cn('w-full max-w-17', className)} {...props}>
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items per page</SelectLabel>
          {PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
