import express from "express";
import multer from "multer";
import PatronsController from "./patrons.controller.js";

const patronsRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

patronsRouter.get("/", PatronsController.getAll);
patronsRouter.post("/", upload.single("image"), PatronsController.create);
patronsRouter.put("/:id", upload.single("image"), PatronsController.update);
patronsRouter.delete("/:id", PatronsController.delete);

export default patronsRouter;