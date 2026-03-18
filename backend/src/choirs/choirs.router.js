import express from "express";
import multer from "multer";
import ChoirsController from "./choirs.controller.js";

const choirsRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

choirsRouter.get("/", ChoirsController.getAll);
choirsRouter.post("/", upload.single("choirPhoto"), ChoirsController.create);
choirsRouter.put("/:id", upload.single("choirPhoto"), ChoirsController.update);
choirsRouter.delete("/:id", ChoirsController.delete);

export default choirsRouter;