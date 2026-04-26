import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type WithTooltipProps = React.ComponentProps<typeof Tooltip> & {
  message: React.ReactNode
}

export default function WithTooltip({
  children,
  message,
  ...props
}: WithTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>
        <span role="presentation" className="inline-block w-fit">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>{message}</TooltipContent>
    </Tooltip>
  )
}
