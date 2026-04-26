import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'

import App from '@/app'
import { RootError } from '@/components'
import './index.css'

const rootEl = document.getElementById('root')

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary FallbackComponent={RootError}>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
}
