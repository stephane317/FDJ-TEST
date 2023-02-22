export enum EHttpErrorNames {
  BAD_REQUEST = 'Invalid syntax',
  AUTHENTICATION_ERROR = 'Authentication error',
  VALIDATION_ERROR = 'Validation error',
  DATA_NOT_FOUND = 'Data not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  SERVICE_UNAVAILABLE = 'Service unavailable'
}

export interface IAppError {
  name?: EHttpErrorNames
  status?: number
  error?: Error
  message?: string // The error message from code
  customMessage?: string // The message we want really want to display on client side
}

export interface IFormattedLoggerData {
  originalUrl?: string
  manager?: string
  controller?: string
  // eslint-disable-next-line camelcase
  controller_type?: string
  message?: string
  customMessage?: string
  name?: string
  status?: number
  context?: object
}
