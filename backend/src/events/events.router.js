import express from "express";
import multer from "multer";
import { EventController } from "./events.controller.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events",
    format: async (req, file) => "png",
    public_id: (req, file) => Date.now() + "-" + file.originalname
  }
});

const upload = multer({ storage });
export const eventsRouter = express.Router();

eventsRouter.post("/", upload.single("photo"), EventController.create);
eventsRouter.put("/:id", upload.single("photo"), EventController.update);
eventsRouter.get("/", EventController.getAll);
eventsRouter.get("/search", EventController.getByTitle);
eventsRouter.delete("/:id", EventController.delete);