import express from "express";
import {
  DeleteExperience,
  createExperience,
  getExperience,
  updateExperience,
} from "../controller/ExperienceController.js";
import isSigned from "../utils/MiddleWares/Authentication.js";

const ExperienceRouter = express.Router();

ExperienceRouter.post("/create/:uid", isSigned, createExperience);
ExperienceRouter.get("/:uid", isSigned, getExperience);
ExperienceRouter.put("/:uid/update/:eid", isSigned, updateExperience);
ExperienceRouter.delete("/:uid/delete/:eid", isSigned, DeleteExperience);

export default ExperienceRouter;
