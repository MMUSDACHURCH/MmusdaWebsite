import express from "express";
import ChoirsController from "./choirs.controller.js";

const choirsRouter = express.Router();

choirsRouter.get("/", ChoirsController.getAll);
choirsRouter.post("/", ChoirsController.create);
choirsRouter.put("/:id", ChoirsController.update);
choirsRouter.delete("/:id", ChoirsController.delete);

export default choirsRouter;