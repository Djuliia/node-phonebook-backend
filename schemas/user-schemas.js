const Joi = require("joi");

const signupUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userSchemas = {
  signupUserSchema,
};

module.exports = userSchemas;
