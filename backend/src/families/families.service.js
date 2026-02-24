import { db } from "../Drizzle/db.js";
import { families } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const FamiliesService = {
  getAll: async () => {
    return await db.select().from(families);
  },

  create: async (data) => {
    const inserted = await db.insert(families).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db.update(families).set(data).where(eq(families.familyId, id)).returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(families).where(eq(families.familyId, id));
  }
};