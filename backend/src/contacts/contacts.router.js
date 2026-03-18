import express from "express";
import { ContactController } from "./contacts.controller.js";

export const contactsRouter = express.Router();

// Routes
contactsRouter.post("/", ContactController.create); // Create a contact
contactsRouter.get("/", ContactController.getAll);  // Get all contacts
contactsRouter.delete("/:id", ContactController.delete); // Delete a contact by ID