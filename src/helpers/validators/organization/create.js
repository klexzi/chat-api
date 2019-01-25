import handleErrors from "../../handle-errors"
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)


const validate = (dataObject) => {
   const addressSchema = {
      street: Joi.string().max(300),
      city: Joi.string().max(100).regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/),
      state: Joi.string().alphanum().max(100)
   }
   const schema = {
      name: Joi.string().max(100).trim().required(),
      email: Joi.string().email().max(255).required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().alphanum(),
      organizationName: Joi.string().required().regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/),
      address: Joi.object().keys(addressSchema)
   }
   return Joi.validate(dataObject, schema, {convert: true});
}
export {validate as default};

//phone .regex("(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$")
// organization name .regex("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
// city .regex("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")