import express from "express";
import isSigned from "../utils/MiddleWares/Authentication.js";
import {
  CreateTask,
  DeleteTask,
  GetAllTask,
  UpdateTask,
} from "../controller/TaskController.js";
const TaskRouter = express.Router();

TaskRouter.post("/createtask", CreateTask);
TaskRouter.get("/mytask/:uid", isSigned, GetAllTask);
TaskRouter.put("/updatemytask/:tid", UpdateTask);
TaskRouter.delete("/delete/:tid", DeleteTask);

export default TaskRouter;
