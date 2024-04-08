import express from "express";
import {
  getPersonalInfo,
  managePersonalInfo,
  managePhoto,
} from "../controller/PersonalInfoController.js";
import isSigned from "../utils/MiddleWares/Authentication.js";

const PersonalInfoRouter = express.Router();
PersonalInfoRouter.post("/manage/:uid", isSigned, managePersonalInfo);
PersonalInfoRouter.get("/:uid", isSigned, getPersonalInfo);
PersonalInfoRouter.put("/photo/:uid", isSigned, managePhoto);

export default PersonalInfoRouter;
