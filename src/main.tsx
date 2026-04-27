import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import App from '@/app'
import { ErrorFallback } from '@/components'
import './index.css'

const rootEl = document.getElementById('root')

const RootFallback = (props: FallbackProps) => (
  <ErrorFallback {...props} className="min-h-screen" />
)

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary FallbackComponent={RootFallback}>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
}
