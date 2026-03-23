import { db } from "../Drizzle/db.js";
import { offeringDetails } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const offeringDetailsService = {
  getAll: async () => {
    return await db.select().from(offeringDetails);
  },

  create: async (data) => {
    return await db.insert(offeringDetails).values({
      name: data.name,
      phoneNumber: data.phoneNumber,
    }).returning();
  },

  update: async (id, data) => {
    return await db
      .update(offeringDetails)
      .set({
        name: data.name,
        phoneNumber: data.phoneNumber,
      })
      .where(eq(offeringDetails.id, id))
      .returning();
  },

  delete: async (id) => {
    return await db
      .delete(offeringDetails)
      .where(eq(offeringDetails.id, id))
      .returning();
  },
};