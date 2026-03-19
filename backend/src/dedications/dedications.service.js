import { db } from "../Drizzle/db.js";
import { dedications } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const createDedication = async (data) => {
  return await db.insert(dedications).values(data).returning();
};

export const getAllDedications = async () => {
  return await db.select().from(dedications);
};

export const getFirstTwoDedications = async () => {
  return await db.select().from(dedications).limit(2);
};

export const updateDedication = async (id, data) => {
  return await db
    .update(dedications)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(dedications.dedicationId, id))
    .returning();
};

export const deleteDedication = async (id) => {
  return await db
    .delete(dedications)
    .where(eq(dedications.dedicationId, id))
    .returning();
};