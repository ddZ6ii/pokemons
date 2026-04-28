import type { FallbackProps } from 'react-error-boundary'

import { HttpError, ValidationError } from '@/api'
import { ErrorAlert } from '@/components'
import { cn } from '@/utilities'

type ErrorFallbackProps = FallbackProps & {
  className?: string
  title?: string
}

export default function ErrorFallback({
  className,
  error,
  resetErrorBoundary,
  title,
}: ErrorFallbackProps) {
  // Validation errors are not recoverable (API contract broken) → non retryable.
  // HTTP 4xx (non-404) → permanent → non retryable.
  // HTTP 5xx or unknown (e.g. server down, network down, etc.) → retryable.
  const isRecoverable =
    !(error instanceof ValidationError) &&
    !(error instanceof HttpError && error.status < 500)

  return (
    <div className={cn('grid place-content-center', className)}>
      <ErrorAlert
        title={title}
        errorMessage={error instanceof Error ? error.message : 'Unknown error'}
        onRetry={isRecoverable ? resetErrorBoundary : undefined}
      />
    </div>
  )
}
