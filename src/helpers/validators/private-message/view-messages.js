import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const validate = data => {
  const schema = {
    recipient: Joi.objectId().required()
  };

  return Joi.validate(data, schema);
};

export { validate as default };