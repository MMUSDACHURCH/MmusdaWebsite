import express from "express";
import * as controller from "./dedications.controller.js";

const dedicationsRouter = express.Router();

dedicationsRouter.post("/", controller.create);
dedicationsRouter.get("/", controller.getAll);
dedicationsRouter.put("/:id", controller.update);
dedicationsRouter.delete("/:id", controller.remove);

export default dedicationsRouter;