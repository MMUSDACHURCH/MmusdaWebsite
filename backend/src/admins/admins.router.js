import express from "express";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
} from "./admins.controller.js";

export const AdminsRouter = express.Router();

AdminsRouter.get("/", getAdmins);
AdminsRouter.post("/", createAdmin);
AdminsRouter.put("/:id", updateAdmin);
AdminsRouter.delete("/:id", deleteAdmin);