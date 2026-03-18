import express from "express";
import {
  createOfferingController,
  getAllOfferingsController,
  getByPhoneAndNameController,
  deleteOfferingController,
  getPhoneAndNameController
} from "./offering.controller.js";

const offeringsRouter = express.Router();

offeringsRouter.post("/", createOfferingController);
offeringsRouter.get("/", getAllOfferingsController);
offeringsRouter.get("/search", getByPhoneAndNameController);
offeringsRouter.delete("/:id", deleteOfferingController);

// New route for phoneNumber and name only
offeringsRouter.get("/phones-names", getPhoneAndNameController);

export default offeringsRouter;