const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

const schemas = {
  contactAddSchema,
};

module.exports = schemas;
