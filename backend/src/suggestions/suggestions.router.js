// suggestions.router.js
import express from "express";
import { SuggestionsController } from "./suggestions.controller.js";

export const suggestionsRouter = express.Router();

suggestionsRouter.post("/", SuggestionsController.create);
suggestionsRouter.get("/", SuggestionsController.getAll);
suggestionsRouter.delete("/:id", SuggestionsController.delete);