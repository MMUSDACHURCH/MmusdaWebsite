import { db } from "../Drizzle/db.js";
import { baptisms } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const BaptismsService = {
  getAll: async () => {
    return await db.select().from(baptisms);
  },

  create: async (data) => {
    const inserted = await db.insert(baptisms).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(baptisms)
      .set(data)
      .where(eq(baptisms.baptismId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(baptisms).where(eq(baptisms.baptismId, id));
  },
};