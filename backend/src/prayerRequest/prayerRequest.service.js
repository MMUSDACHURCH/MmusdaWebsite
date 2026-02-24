import { db } from "../Drizzle/db.js";
import { prayerRequests } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const PrayerRequestsService = {
  getAll: async () => {
    return await db.select().from(prayerRequests);
  },

  create: async (data) => {
    const inserted = await db.insert(prayerRequests).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(prayerRequests)
      .set(data)
      .where(eq(prayerRequests.requestId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db
      .delete(prayerRequests)
      .where(eq(prayerRequests.requestId, id));
  },

  getById: async (id) => {
    const result = await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.requestId, id));
    return result[0] || null;
  }
};