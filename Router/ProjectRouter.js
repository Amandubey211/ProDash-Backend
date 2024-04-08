import express from "express";
import {
  DeleteProject,
  GetAllProject,
  UpdateProjectController,
  createProjectController,
} from "../controller/ProjectController.js";
import isSigned from "../utils/MiddleWares/Authentication.js";
const ProjectRouter = express.Router();

ProjectRouter.post("/create", createProjectController);
ProjectRouter.put("/update/:pid", UpdateProjectController);
ProjectRouter.get("/user/:uid", isSigned, GetAllProject);
ProjectRouter.delete("/delete/:pid", DeleteProject);

export default ProjectRouter;
