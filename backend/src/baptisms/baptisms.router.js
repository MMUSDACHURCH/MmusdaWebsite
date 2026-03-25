import express from "express";
import BaptismsController from "./baptisms.controller.js";

const baptismsRouter = express.Router();

baptismsRouter.get("/", BaptismsController.getAll);
baptismsRouter.post("/", BaptismsController.create);
baptismsRouter.put("/:id", BaptismsController.update);
baptismsRouter.delete("/:id", BaptismsController.delete);

export default baptismsRouter;