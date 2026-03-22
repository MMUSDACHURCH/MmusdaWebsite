import express from "express";
import multer from "multer";
import path from "path";
import PastorsController from "./pastors.controller.js";

const pastorsRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pastors");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

pastorsRouter.get("/", PastorsController.getAll);
pastorsRouter.post("/", upload.single("image"), PastorsController.create);
pastorsRouter.put("/:id", upload.single("image"), PastorsController.update);
pastorsRouter.delete("/:id", PastorsController.delete);

export default pastorsRouter;