import Joi from "joi";

const validate = password => {
  const schema = {
    code: Joi.number()
      .integer()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  };

  return Joi.validate(password, schema);
};

export { validate as default };
