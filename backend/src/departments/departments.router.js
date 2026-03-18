import express from "express";
import { DepartmentController } from "./departments.controller.js";

export const departmentRouter = express.Router();

// CRUD routes
departmentRouter.post("/", DepartmentController.create);
departmentRouter.get("/", DepartmentController.getAll);
departmentRouter.put("/:id", DepartmentController.update);
departmentRouter.delete("/:id", DepartmentController.delete);