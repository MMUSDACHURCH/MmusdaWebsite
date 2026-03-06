import { db } from "../Drizzle/db.js";
import { offeringDetails } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm"; // import eq helper

export const offeringDetailsService = {
  getAll: async () => {
    return await db.select().from(offeringDetails);
  },

  update: async (id, data) => {
    return await db
      .update(offeringDetails)
      .set({
        name: data.name,
        phoneNumber: data.phoneNumber,
      })
      .where(eq(offeringDetails.id, id)) //  use eq helper
      .returning();
  },
};