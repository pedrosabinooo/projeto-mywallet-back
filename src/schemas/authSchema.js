import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirmation: joi.ref('password')
});

export const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});
