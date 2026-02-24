import { db } from "../Drizzle/db.js";
import { announcements } from "../Drizzle/schema.js";
import { eq, gte, lte, and } from "drizzle-orm";

export const AnnouncementsService = {
  getAll: async () => {
    return await db.select().from(announcements);
  },

  create: async (data) => {
    const inserted = await db.insert(announcements).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(announcements)
      .set(data)
      .where(eq(announcements.announcementId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db
      .delete(announcements)
      .where(eq(announcements.announcementId, id));
  },

  getByDate: async (from, to) => {
    return await db
      .select()
      .from(announcements)
      .where(
        and(
          gte(announcements.createdAt, new Date(from)),
          lte(announcements.createdAt, new Date(to))
        )
      );
  }
};