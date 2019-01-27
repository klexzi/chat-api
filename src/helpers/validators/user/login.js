import Joi from "joi";

const validate = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  };

  return Joi.validate(data, schema);
};

export { validate as default };
