export class ServerError extends Error {
  status: number
  constructor(err: unknown) {
    super(err instanceof Error ? err.message : 'Unexpected server error', {
      cause: err,
    })
    this.name = 'ServerError'
    this.status = 500
  }
}
