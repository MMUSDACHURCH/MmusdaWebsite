import { db } from "../Drizzle/db.js";
import { announcements } from "../Drizzle/schema.js";
import { eq, gte } from "drizzle-orm";

export const AnnouncementsService = {

  getAll: async () => {
    return await db.select().from(announcements);
  },

  getById: async (id) => {
    const result = await db
      .select()
      .from(announcements)
      .where(eq(announcements.announcementId, id));

    return result[0];
  },

  create: async (data) => {
    const result = await db
      .insert(announcements)
      .values({
        title: data.title,
        description: data.description,
        createdBy: data.createdBy
      })
      .returning();

    return result[0];
  },

  update: async (id, data) => {
    const result = await db
      .update(announcements)
      .set({
        title: data.title,
        description: data.description
      })
      .where(eq(announcements.announcementId, id))
      .returning();

    return result[0];
  },

  delete: async (id) => {
    return await db
      .delete(announcements)
      .where(eq(announcements.announcementId, id));
  },

  getByDate: async (startDate) => {

    if (!startDate) {
      return await db.select().from(announcements);
    }

    return await db
      .select()
      .from(announcements)
      .where(gte(announcements.createdAt, new Date(startDate)));

  }

};