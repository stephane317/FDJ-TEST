import Joi from '@hapi/joi'
import logger from '@service/logger.service'
import { EHttpErrorNames } from '@type/app-error.type'
import { AppError } from './error'

export class Controller {
  joiSchema: any
  constructor(objectJoiSchema: Joi.AnySchema) {
    this.joiSchema = objectJoiSchema
  }
  /**
   * @description validate object<any> with a Joi.Schema and return an object<T>
   * @param {Object} object
   * @param schema? - optional param to validate object against it instead of this.joiSchema
   * @returns a validated <T> object
   */
  public isBodyValid<T>(object: any, schema?: Joi.AnySchema): T {
    const { error, value }: Joi.ValidationResult = schema ? schema.validate(object) : this.joiSchema.validate(object)
    if (error) {
      throw new AppError({ name: EHttpErrorNames.VALIDATION_ERROR, status: 400, message: error.details[0].message })
    }
    if (!error) {
      return value
    }
  }

  public logInfo(data: any, message?: string): void {
    logger.info(data, message)
  }
}
