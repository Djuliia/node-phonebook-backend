const Joi = require("joi");

const signupUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userSchemas = {
  signupUserSchema,
  loginSchema,
};

module.exports = userSchemas;
