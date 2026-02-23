import express from "express";
import { AnnouncementController } from "./announcements.controller.js";

export const announcementsRouter = express.Router();

// CRUD routes
announcementsRouter.post("/", AnnouncementController.create);
announcementsRouter.get("/", AnnouncementController.getAll);
announcementsRouter.get("/by-date", AnnouncementController.getByDate);
announcementsRouter.put("/:id", AnnouncementController.update);
announcementsRouter.delete("/:id", AnnouncementController.delete);