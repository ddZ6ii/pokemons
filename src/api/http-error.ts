export class HttpError extends Error {
  status: number
  constructor(response: Response) {
    super(
      `${response.status.toString()} ${response.statusText} — ${response.url}`,
    )
    this.name = 'HttpError'
    this.status = response.status
  }
}
