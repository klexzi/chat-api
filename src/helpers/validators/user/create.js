const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validate = dataObject => {
  const schema = {
    name: Joi.string()
      .max(100)
      .trim()
      .required(),
    email: Joi.string()
      .email()
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    organization: Joi.objectId().required(),
    phone: Joi.string().alphanum()
  };
  return Joi.validate(dataObject, schema, { convert: true });
};
export { validate as default };
