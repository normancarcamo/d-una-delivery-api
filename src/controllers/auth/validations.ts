import Joi from '@hapi/joi';

export const userRegisterSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().not().empty().required(),
    last: Joi.string().not().empty().required()
  }).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.string().required().not().empty(),
  photo: Joi.string().optional(),
  address: Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number(),
    streetAddress: Joi.string().not().empty().required()
  })
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required()
});
