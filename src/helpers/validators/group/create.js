import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const validate = data => {
  const schema = {
    name: Joi.string()
      .required()
      .trim()
      .regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/),
    participants: Joi.array()
      .items(Joi.objectId())
      .required()
  };

  return Joi.validate(data, schema);
};

export { validate as default };
