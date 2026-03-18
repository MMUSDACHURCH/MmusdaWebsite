import { db } from "../Drizzle/db.js";
import { choirs } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const ChoirsService = {
  getAll: async () => {
    return await db.select().from(choirs);
  },

  create: async (data) => {
    const inserted = await db.insert(choirs).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db.update(choirs).set(data).where(eq(choirs.choirId, id)).returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(choirs).where(eq(choirs.choirId, id));
  }
};