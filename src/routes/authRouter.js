import { Router } from "express";

import { signUp, logIn, signOut } from "../controllers/authController.js";
import {
  validateLogIn,
  validateSignUp,
} from "../middlewares/validateAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/login", validateLogIn, logIn);
authRouter.get("/signout", signOut);

export default authRouter;
