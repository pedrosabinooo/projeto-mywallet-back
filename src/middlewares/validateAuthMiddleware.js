import { logInSchema, signUpSchema } from "../schemas/authSchema.js";

export function validateSignIn(req, res, next) {
  const {error} = logInSchema.validate(req.body);
  if(error) {
    return res.sendStatus(422); // unprocessable entity
  }

  next();
}

export function validateSignUp(req, res, next) {
  const {error} = signUpSchema.validate(req.body);
  if(error) {
    return res.sendStatus(422); // unprocessable entity
  }

  next();
}