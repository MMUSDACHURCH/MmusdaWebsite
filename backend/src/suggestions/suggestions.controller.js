// suggestions.controller.js
import { SuggestionsService } from "./suggestions.service.js";

export const SuggestionsController = {
  async create(req, res) {
    try {
      const data = req.body;
      const suggestion = await SuggestionsService.createSuggestion(data);
      res.status(201).json(suggestion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const list = await SuggestionsService.getAllSuggestions();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await SuggestionsService.deleteSuggestion(Number(id));
      res.json({ message: "Suggestion deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};