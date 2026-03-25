import express from "express";
import MembershipTransfersController from "./membershipTransfers.controller.js";

const transferRouter = express.Router();

transferRouter.get("/", MembershipTransfersController.getAll);
transferRouter.post("/", MembershipTransfersController.create);
transferRouter.put("/:id", MembershipTransfersController.update);
transferRouter.delete("/:id", MembershipTransfersController.delete);

export default transferRouter;