// members.service.js
import { eq } from "drizzle-orm";
import { db } from "../Drizzle/db.js"; 
import { members } from "../Drizzle/schema.js";

export const MembersService = {
  // Create a new member
  async createMember(data) {
    const result = await db.insert(members).values(data).returning();
    return result[0];
  },

  // Get all members
  async getAllMembers() {
    return await db.select().from(members);
  },

  // Delete a member by ID
  async deleteMember(memberId) {
    return await db.delete(members).where(eq(members.memberId, memberId));
  },

  // Get members by area of residence
  async getByArea(area) {
    return await db
      .select()
      .from(members)
      .where(eq(members.areaOfResidence, area));
  }
};