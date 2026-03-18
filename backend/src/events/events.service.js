import { db } from "../Drizzle/db.js";
import { events } from "../Drizzle/schema.js";
import { eq, ilike } from "drizzle-orm";

export const EventService = {
  createEvent: async ({ title, description, eventDate, photo }) => {
    const result = await db.insert(events).values({ title, description, eventDate, photo: photo || null }).returning();
    return result[0];
  },
  getAllEvents: async () => {
    return db.select().from(events).orderBy(events.eventDate,"desc");
  },
  getEventsByTitle: async (title) => {
    return db.select().from(events).where(ilike(events.title, `%${title}%`));
  },
  updateEvent: async (eventId, data) => {
    const id = Number(eventId);
    const result = await db.update(events).set({ ...data, updatedAt: new Date() }).where(eq(events.eventId, id)).returning();
    return result[0];
  },
  deleteEvent: async (eventId) => {
    const id = Number(eventId);
    return db.delete(events).where(eq(events.eventId, id));
  }
};