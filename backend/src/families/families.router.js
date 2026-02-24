import express from "express";
import FamiliesController from "./families.controller.js";

const familiesRouter = express.Router();

familiesRouter.get("/", FamiliesController.getAll);
familiesRouter.post("/", FamiliesController.create);
familiesRouter.put("/:id", FamiliesController.update);
familiesRouter.delete("/:id", FamiliesController.delete);

export default familiesRouter;