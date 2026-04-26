import { AlertCircleIcon } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export default function RootError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="grid min-h-screen place-content-center">
      <Alert
        variant="destructive"
        className="mx-auto max-w-md md:has-data-[slot=alert-action]:pr-24 *:[svg]:relative *:[svg]:top-0.5 md:*:[svg]:top-1"
      >
        <AlertCircleIcon />
        <AlertTitle className="md:text-lg">Something went wrong</AlertTitle>
        <AlertDescription>
          <pre className="text-xs whitespace-normal md:text-sm">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </AlertDescription>
        <AlertAction>
          <Button
            type="button"
            variant="secondary"
            onClick={resetErrorBoundary}
          >
            Retry
          </Button>
        </AlertAction>
      </Alert>
    </div>
  )
}
