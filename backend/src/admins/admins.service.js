import { db } from "../Drizzle/db.js";
import { admins } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const getAllAdminsService = async () => {
  return await db.select().from(admins);
};

export const createAdminService = async (data) => {
  const count = await db.select().from(admins);
  if (count.length >= 5) {
    throw new Error("Maximum admins reached");
  }
  const result = await db.insert(admins).values(data).returning();
  return result[0];
};

export const updateAdminService = async (id, data) => {
  const result = await db
    .update(admins)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(admins.adminId, id))
    .returning();
  return result[0];
};

export const deleteAdminService = async (id) => {
  await db.delete(admins).where(eq(admins.adminId, id));
};