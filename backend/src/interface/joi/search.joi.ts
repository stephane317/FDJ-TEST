import Joi from '@hapi/joi'

export default Joi.object({
  search: Joi.string().max(80).allow('').required()
}).required()
