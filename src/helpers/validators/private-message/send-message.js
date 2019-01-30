import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const validate = data => {
  const messageSchema = {
    messageType: Joi.string()
      .valid(["text"])
      .required(),
    data: Joi.string().required()
  };
  const schema = {
    message: Joi.object()
      .keys(messageSchema)
      .required(),
    recipient: Joi.objectId().required(),
    repliedMessage: Joi.objectId()
  };

  return Joi.validate(data, schema);
};

export { validate as default };
