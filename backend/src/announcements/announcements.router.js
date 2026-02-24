import express from "express";
import AnnouncementsController from "./announcements.controller.js";

export const announcementsRouter = express.Router();

announcementsRouter.get("/", AnnouncementsController.getAll);
announcementsRouter.post("/", AnnouncementsController.create);
announcementsRouter.put("/:id", AnnouncementsController.update);
announcementsRouter.delete("/:id", AnnouncementsController.delete);
announcementsRouter.get("/filter/date", AnnouncementsController.getByDate);