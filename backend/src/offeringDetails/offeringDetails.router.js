import express from "express";
import { offeringDetailsController } from "./offeringDetails.controller.js";

const offeringDetailsRouter = express.Router();

offeringDetailsRouter.get("/", offeringDetailsController.getAll);
offeringDetailsRouter.post("/", offeringDetailsController.create);
offeringDetailsRouter.put("/:id", offeringDetailsController.update);
offeringDetailsRouter.delete("/:id", offeringDetailsController.delete);

export default offeringDetailsRouter;