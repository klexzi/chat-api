import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const validate = password => {
  const schema = {
    code: Joi.number()
      .integer()
      .required(),
    userId: Joi.objectId().required(),
    password: Joi.string()
      .min(8)
      .required()
  };

  return Joi.validate(password, schema);
};

export { validate as default };
