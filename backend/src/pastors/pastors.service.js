import { db } from "../Drizzle/db.js";
import { pastors } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const PastorsService = {
  getAll: async () => {
    return await db.select().from(pastors);
  },

  create: async (data) => {
    const inserted = await db.insert(pastors).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(pastors)
      .set(data)
      .where(eq(pastors.pastorId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(pastors).where(eq(pastors.pastorId, id));
  },
};