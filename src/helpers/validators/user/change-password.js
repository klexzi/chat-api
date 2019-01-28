import Joi from "joi";

const validate = data => {
  const schema = {
    oldPassword: Joi.string()
      .min(8)
      .required(),
    newPassword: Joi.string()
      .min(8)
      .required()
  };

  return Joi.validate(data, schema);
};

export { validate as default };
