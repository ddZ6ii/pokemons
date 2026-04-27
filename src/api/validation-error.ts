import { ZodError } from 'zod'

export class ValidationError extends Error {
  issues: ZodError['issues']
  constructor(err: ZodError) {
    super(`Response validation failed: ${err.message}`, {
      cause: err.cause,
    })
    this.name = 'ValidationError'
    this.issues = err.issues
  }
}
