import { AlertCircleIcon } from 'lucide-react'

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities'

type ErrorAlertProps = Omit<React.ComponentProps<typeof Alert>, 'children'> & {
  title?: string
  errorMessage: string
  onRetry?: () => void
}

export default function ErrorAlert({
  className,
  title = 'Something went wrong',
  errorMessage,
  onRetry,
  ...props
}: ErrorAlertProps) {
  return (
    <Alert
      variant="destructive"
      className={cn(
        'mx-auto max-w-md md:has-data-[slot=alert-action]:pr-24 *:[svg]:relative *:[svg]:top-0.5 md:*:[svg]:top-1',
        className,
      )}
      {...props}
    >
      <AlertCircleIcon />
      <AlertTitle className="md:text-lg">{title}</AlertTitle>
      <AlertDescription>
        <pre className="text-xs whitespace-normal md:text-sm">
          {errorMessage}
        </pre>
      </AlertDescription>
      {onRetry && (
        <AlertAction>
          <Button type="button" variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </AlertAction>
      )}
    </Alert>
  )
}
