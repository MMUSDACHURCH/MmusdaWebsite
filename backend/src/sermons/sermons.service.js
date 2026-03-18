import { db } from "../Drizzle/db.js";
import { sermons } from "../Drizzle/schema.js";
import { desc, eq } from "drizzle-orm";

const SermonsService = {
  getInitialSermons: async () => {
    return await db
      .select()
      .from(sermons)
      .orderBy(desc(sermons.sermonDate))
      .limit(3);
  },

  getAllSermons: async () => {
    return await db
      .select()
      .from(sermons)
      .orderBy(desc(sermons.sermonDate));
  },

  createSermon: async ({ title, sermonDate, videoUrl, description }) => {
    const result = await db
      .insert(sermons)
      .values({
        title,
        sermonDate,
        videoUrl,
        description
      })
      .returning();

    return result[0];
  },

  updateSermon: async (sermonId, { title, sermonDate, videoUrl, description }) => {
    const result = await db
      .update(sermons)
      .set({
        title,
        sermonDate,
        videoUrl,
        description,
        updatedAt: new Date()
      })
      .where(eq(sermons.sermonId, sermonId))
      .returning();

    return result[0];
  },

  deleteSermon: async (sermonId) => {
    const result = await db
      .delete(sermons)
      .where(eq(sermons.sermonId, sermonId))
      .returning();

    return result[0];
  }
};

export default SermonsService;