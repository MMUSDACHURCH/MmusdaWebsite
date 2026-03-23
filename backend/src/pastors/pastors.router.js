import express from "express";
import multer from "multer";
import PastorsController from "./pastors.controller.js";

const pastorsRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

pastorsRouter.get("/", PastorsController.getAll);
pastorsRouter.post("/", upload.single("image"), PastorsController.create);
pastorsRouter.put("/:id", upload.single("image"), PastorsController.update);
pastorsRouter.delete("/:id", PastorsController.delete);

export default pastorsRouter;