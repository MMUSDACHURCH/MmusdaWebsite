import express from "express";
import multer from "multer";
import path from "path";
import EldersController from "./elders.controller.js";

const eldersRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/elders");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

eldersRouter.get("/", EldersController.getAll);
eldersRouter.post("/", upload.single("image"), EldersController.create);
eldersRouter.put("/:id", upload.single("image"), EldersController.update);
eldersRouter.delete("/:id", EldersController.delete);

export default eldersRouter;