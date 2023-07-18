const Joi = require("joi");
const validate = data => {
  console.log("Validating data:", data);
  const schema = Joi.object({
    email: Joi.string().regex(/^\d+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  const {
    error,
    value
  } = schema.validate(data);
  console.log("Validation result:", error, value);
  return {
    error,
    value
  };
};
module.exports = validate;