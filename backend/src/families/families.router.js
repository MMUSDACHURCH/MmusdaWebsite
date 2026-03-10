import express from "express";
import FamiliesController from "./families.controller.js";
import multer from "multer";

const familiesRouter = express.Router();

// Multer memory storage (no disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

familiesRouter.get("/", FamiliesController.getAll);
familiesRouter.post("/", upload.single("photo"), FamiliesController.create);
familiesRouter.put("/:id", upload.single("photo"), FamiliesController.update);
familiesRouter.delete("/:id", FamiliesController.delete);

export default familiesRouter;