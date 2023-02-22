import { Controller } from '@class/controller.crud'
import Joi from '@hapi/joi'

// Any different generic function which could be reuse for different business / internal in the serach
export class PlayerController extends Controller {
  constructor(joiSchema?: Joi.Schema) {
    super(joiSchema)
  }
}
