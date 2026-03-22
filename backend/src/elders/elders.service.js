import { db } from "../Drizzle/db.js";
import { elders } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const EldersService = {
  getAll: async () => {
    return await db.select().from(elders);
  },

  create: async (data) => {
    const inserted = await db.insert(elders).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(elders)
      .set(data)
      .where(eq(elders.elderId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(elders).where(eq(elders.elderId, id));
  },
};