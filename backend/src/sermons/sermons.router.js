import express from "express";
import SermonsController from "../sermons/sermons.controller.js";

const sermonsRouter = express.Router();

sermonsRouter.get("/initial", SermonsController.getInitialSermons);
sermonsRouter.get("/all", SermonsController.getAllSermons);
sermonsRouter.post("/", SermonsController.createSermon);
sermonsRouter.put("/:id", SermonsController.updateSermon);
sermonsRouter.delete("/:id", SermonsController.deleteSermon);

export default sermonsRouter;