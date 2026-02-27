// members.router.js
import express from "express";
import { MembersController } from "./members.controller.js";

export const membersRouter = express.Router();

// Create a member
membersRouter.post("/", MembersController.createMember);

// Get all members
membersRouter.get("/", MembersController.getAllMembers);

// Delete a member by ID
membersRouter.delete("/:id", MembersController.deleteMember);

// Get members by area of residence
membersRouter.get("/area/:area", MembersController.getByArea);