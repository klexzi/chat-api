import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const validate = data => {
  const schema = {
    organization: Joi.objectId().required(),
    group: Joi.objectId().required(),
    participants: Joi.array().items(Joi.objectId().required())
  };

  return Joi.validate(data, schema);
};

export { validate as default };
