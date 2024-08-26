import { Router } from "express";

import authController from "../controllers/authController.js";

import validateBody from "../decorators/validateBody.js";

import { userSigninSchema, userSignupSchema } from "../schemas/authSchema.js";
import authenticate from "../middlewares/authenticate.js";

const signupMiddleware = validateBody(userSignupSchema);
const signinMiddleware = validateBody(userSigninSchema);

const authRouter = Router();

authRouter.post("/signup", signupMiddleware, authController.signup);

authRouter.post("/signin", signinMiddleware, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.get("/:userId", authController.userById);

export default authRouter;
