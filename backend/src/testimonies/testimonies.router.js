import express from "express";
import * as controller from "./testimonies.controller.js";

const testimoniesRouter = express.Router();

testimoniesRouter.post("/", controller.create);
testimoniesRouter.get("/", controller.getAll);
testimoniesRouter.put("/:id", controller.update);
testimoniesRouter.delete("/:id", controller.remove);

export default testimoniesRouter;