import { db } from "../Drizzle/db.js";
import { patrons } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const PatronsService = {
  getAll: async () => {
    return await db.select().from(patrons);
  },

  create: async (data) => {
    const inserted = await db.insert(patrons).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(patrons)
      .set(data)
      .where(eq(patrons.patronId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(patrons).where(eq(patrons.patronId, id));
  },
};