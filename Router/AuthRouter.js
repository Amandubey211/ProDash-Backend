import express from "express";
import {
  SignInController,
  SignUpController,
  VerifyController,
} from "../controller/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignUpController);
AuthRouter.post("/signin", SignInController);
AuthRouter.post("/verify/:uid", VerifyController);

export default AuthRouter;
