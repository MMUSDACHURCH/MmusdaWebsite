import express from "express";
import HomeChurchesController from "./homechurches.controller.js";

const homeChurchesRouter = express.Router();

homeChurchesRouter.get("/", HomeChurchesController.getAll);
homeChurchesRouter.post("/", HomeChurchesController.create);
homeChurchesRouter.put("/:id", HomeChurchesController.update);
homeChurchesRouter.delete("/:id", HomeChurchesController.delete);

export default homeChurchesRouter;