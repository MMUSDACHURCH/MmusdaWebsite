import { db } from "../Drizzle/db.js";
import { homechurches } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const HomeChurchesService = {
  getAll: async () => {
    return await db.select().from(homechurches);
  },

  create: async (data) => {
    const inserted = await db.insert(homechurches).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db.update(homechurches).set(data).where(eq(homechurches.homechurchId, id)).returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(homechurches).where(eq(homechurches.homechurchId, id));
  }
};