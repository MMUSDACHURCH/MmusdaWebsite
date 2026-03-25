import { db } from "../Drizzle/db.js";
import { membershipTransfers } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const MembershipTransfersService = {
  getAll: async () => {
    return await db.select().from(membershipTransfers);
  },

  create: async (data) => {
    const inserted = await db.insert(membershipTransfers).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const { transferId, createdAt, updatedAt, ...updateData } = data;

    const updated = await db
      .update(membershipTransfers)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(membershipTransfers.transferId, Number(id)))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db.delete(membershipTransfers).where(eq(membershipTransfers.transferId, Number(id)));
  },
};