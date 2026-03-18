// suggestions.service.js
import { db } from "../Drizzle/db.js";
import { suggestions } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const SuggestionsService = {
  // Create suggestion
  async createSuggestion(data) {
    const result = await db.insert(suggestions).values(data).returning();
    return result[0];
  },

  // Get all suggestions
  async getAllSuggestions() {
    return await db.select().from(suggestions);
  },

  // Delete suggestion
  async deleteSuggestion(id) {
    return await db.delete(suggestions).where(eq(suggestions.suggestionId, id));
  }
};