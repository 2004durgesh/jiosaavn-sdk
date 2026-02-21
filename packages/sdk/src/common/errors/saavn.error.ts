export class SaavnError extends Error {
  public statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'SaavnError'
    this.statusCode = statusCode
  }
}
