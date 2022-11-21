import { logInSchema, signUpSchema } from "../schemas/authSchema.js";

export function validateLogIn(req, res, next) {
  const { error } = logInSchema.validate(req.body);
  if (error) {
    res.sendStatus(422); // unprocessable entity
    return;
  }

  next();
}

export function validateSignUp(req, res, next) {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    res.sendStatus(422); // unprocessable entity
    return;
  }

  next();
}
