import { db } from "../Drizzle/db.js";
import { testimonies } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const createTestimony = async (data) => {
  return await db.insert(testimonies).values(data).returning();
};

export const getAllTestimonies = async () => {
  return await db.select().from(testimonies);
};

export const updateTestimony = async (id, data) => {
  return await db
    .update(testimonies)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(testimonies.testimonyId, id))
    .returning();
};

export const deleteTestimony = async (id) => {
  return await db
    .delete(testimonies)
    .where(eq(testimonies.testimonyId, id))
    .returning();
};