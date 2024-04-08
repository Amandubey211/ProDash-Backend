import express from "express";
import {
  CreateEducation,
  DeleteEducation,
  GetAllEducation,
  UpdateEducation,
} from "../controller/EducationController.js";
import { validateEducationInfo } from "../utils/MiddleWares/EducationValidation.js";
import isSigned from "../utils/MiddleWares/Authentication.js";

const EducationRouter = express.Router();

EducationRouter.post(
  "/create/:uid",
  isSigned,
  validateEducationInfo,
  CreateEducation
);
EducationRouter.get("/getall/:uid", isSigned, GetAllEducation);
EducationRouter.put(
  "/:uid/update/:eid",
  isSigned,
  validateEducationInfo,
  UpdateEducation
);
EducationRouter.delete("/:uid/delete/:eid", isSigned, DeleteEducation);
export default EducationRouter;
