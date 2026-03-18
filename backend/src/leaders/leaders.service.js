import { db } from "../Drizzle/db.js";
import { leaders } from "../Drizzle/schema.js";
import { eq, ilike } from "drizzle-orm";

export const LeaderService = {
  // Create a new leader
  createLeader: async ({ name, department, contactInfo, role }) => {
    const result = await db.insert(leaders).values({
      name,
      department: department || null,
      contactInfo: contactInfo || null,
      role: role || null,
    }).returning();
    return result[0];
  },

  // Get all leaders
  getAllLeaders: async () => {
    return db.select().from(leaders).orderBy(leaders.createdAt, "desc");
  },

  // Get leaders by role
  getLeadersByRole: async (role) => {
    return db.select().from(leaders).where(ilike(leaders.role, `%${role}%`));
  },

  // Update leader by ID
  updateLeader: async (leaderId, data) => {
    const id = Number(leaderId);
    const result = await db.update(leaders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(leaders.leaderId, id))
      .returning();
    return result[0];
  },

  // Delete leader by ID
  deleteLeader: async (leaderId) => {
    const id = Number(leaderId);
    return db.delete(leaders).where(eq(leaders.leaderId, id));
  }
};