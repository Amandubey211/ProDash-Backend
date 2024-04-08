import express from "express";
import {
  createAward,
  deleteAward,
  getAwards,
  updateAward,
} from "../controller/AwardController.js";
import isSigned from "../utils/MiddleWares/Authentication.js";

const AwardRouter = express.Router();

AwardRouter.post("/create/:uid", isSigned, createAward);
AwardRouter.delete("/:uid/delete/:aid", isSigned, deleteAward);
AwardRouter.put("/:uid/update/:aid", isSigned, updateAward);
AwardRouter.get("/:uid", isSigned, getAwards);

export default AwardRouter;
