import { IAppError } from '@type/app-error.type'

export class AppError extends Error {
  public status: number

  public name: string

  public message: string

  public customMessage: string

  constructor({ name, status, message, customMessage }: IAppError) {
    super()
    this.name = name
    this.status = status
    this.message = message
    this.customMessage = customMessage
  }
}
