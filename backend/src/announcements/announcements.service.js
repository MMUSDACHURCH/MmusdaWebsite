import { db } from "../Drizzle/db.js"; // your Drizzle DB instance
import { announcements } from "../Drizzle/schema.js"; // your table schema
import { eq, gte, lte } from "drizzle-orm";

export const AnnouncementService = {
  // Create a new announcement
  createAnnouncement: async ({ title, description, createdBy }) => {
    const result = await db.insert(announcements).values({
      title,
      description,
      createdBy,
    }).returning();
    return result[0];
  },

  // Get all announcements
  getAllAnnouncements: async () => {
    return db.select().from(announcements).orderBy(announcements.createdAt, "desc");
  },

  // Get announcements by date range
  getAnnouncementsByDate: async ({ startDate, endDate }) => {
    // Convert string query params to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    return db.select()
      .from(announcements)
      .where(
        gte(announcements.createdAt, start),
        lte(announcements.createdAt, end)
      )
      .orderBy(announcements.createdAt, "desc");
  },

  // Update announcement by ID
  updateAnnouncement: async (announcementId, data) => {
    const id = Number(announcementId);
    const result = await db.update(announcements)
      .set(data)
      .where(eq(announcements.announcementId, id))
      .returning();
    return result[0];
  },

  // Delete announcement by ID
  deleteAnnouncement: async (announcementId) => {
    const id = Number(announcementId);
    return db.delete(announcements)
      .where(eq(announcements.announcementId, id));
  }
};