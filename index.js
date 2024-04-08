import express from "express";
import { config } from "dotenv";
import { DBconnect } from "./DB/dataBase.js";
import AuthRouter from "./Router/AuthRouter.js";
import cors from "cors";
import UserRouter from "./Router/UserRouter.js";
import TaskRouter from "./Router/TaskRouter.js";
import PersonalInfoRouter from "./Router/PersonalInfoRouter.js";
import EducationRouter from "./Router/EducationRoute.js";
import ProjectRouter from "./Router/ProjectRouter.js";
import ExperienceRouter from "./Router/ExperienceRouter.js";
import AwardRouter from "./Router/AwardRouter.js";

config({ path: "./Config/config.env" });
const App = express();
App.use(
  cors({
    origin: process.env.FRONT_END_ORIGIN,
    credentials: true,
  })
);
DBconnect();
App.use(express.json());
App.get("/", (req, res) => {
  res.send("server is running");
});
App.use("/api/auth", AuthRouter);
App.use("/api/user", UserRouter);
App.use("/api/task", TaskRouter);
App.use("/api/info", PersonalInfoRouter);
App.use("/api/edu", EducationRouter);
App.use("/api/project", ProjectRouter);
App.use("/api/experience", ExperienceRouter);
App.use("/api/awards", AwardRouter);

const port = process.env.PORT || 4001;

App.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);
