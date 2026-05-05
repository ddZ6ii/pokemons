import z, { ZodError } from 'zod'

export class ValidationError extends Error {
  issues: ZodError['issues']
  constructor(err: ZodError) {
    const pretty = z.prettifyError(err)
    super(`Response validation failed: \n${pretty}`, {
      cause: err.cause,
    })
    this.name = 'ValidationError'
    this.issues = err.issues
  }
}
