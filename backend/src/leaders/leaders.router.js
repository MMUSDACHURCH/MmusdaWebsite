import express from "express";
import { LeaderController } from "./leaders.controller.js";

export const leadersRouter = express.Router();

// CRUD routes
leadersRouter.post("/", LeaderController.create);           // Create leader
leadersRouter.get("/", LeaderController.getAll);            // Get all leaders
leadersRouter.get("/role", LeaderController.getByRole);     // Get leaders by role, query ?role=someRole
leadersRouter.put("/:id", LeaderController.update);         // Update leader by ID
leadersRouter.delete("/:id", LeaderController.delete);      // Delete leader by ID