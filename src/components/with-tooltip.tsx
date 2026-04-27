import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/utilities'

type WithTooltipProps = React.ComponentProps<typeof Tooltip> &
  Pick<React.ComponentProps<typeof TooltipContent>, 'side'> & {
    message: React.ReactNode
    className?: string
  }

export default function WithTooltip({
  children,
  className,
  message,
  side = 'top',
  ...props
}: WithTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>
        <span
          role="presentation"
          className={cn('inline-block w-fit', className)}
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side={side}>{message}</TooltipContent>
    </Tooltip>
  )
}
