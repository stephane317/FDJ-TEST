import Joi from '@hapi/joi'

export default Joi.object({
  id: Joi.string().hex().length(24).required()
}).required()
