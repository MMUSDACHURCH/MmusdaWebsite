import express from "express";
import { offeringDetailsController } from "./offeringDetails.controller.js";

const offeringDetailsRouter = express.Router();

offeringDetailsRouter.get("/", offeringDetailsController.getAll);
offeringDetailsRouter.put("/:id", offeringDetailsController.update);

export default offeringDetailsRouter;