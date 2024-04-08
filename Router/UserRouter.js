import express from "express";
import {
  GetUserController,
  CalculateProfileCompleteness,
} from "../controller/UserController.js";
import isSigned from "../utils/MiddleWares/Authentication.js";

const UserRouter = express.Router();

UserRouter.get("/:uid", isSigned, GetUserController);
UserRouter.get("/stats/:uid", isSigned, CalculateProfileCompleteness);
export default UserRouter;
