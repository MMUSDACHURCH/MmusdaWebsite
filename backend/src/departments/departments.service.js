import { db } from "../Drizzle/db.js"; // your Drizzle DB instance
import { departments } from "../Drizzle/schema.js"; // your table schema
import { eq } from "drizzle-orm";

export const DepartmentService = {
  // Create a new department
  createDepartment: async ({ name, description, adminLeader, assistant, adminContact }) => {
    const result = await db.insert(departments).values({
      name,
      description,
      adminLeader,
      assistant,
      adminContact,
    }).returning();
    return result[0];
  },

  // Get all departments
  getAllDepartments: async () => {
    return db.select().from(departments).orderBy(departments.createdAt, "desc");
  },

  // Update a department by ID
  updateDepartment: async (departmentId, data) => {
    const id = Number(departmentId);
    const result = await db.update(departments)
      .set({
        ...data,
        updatedAt: new Date() // update timestamp
      })
      .where(eq(departments.departmentId, id))
      .returning();
    return result[0];
  },

  // Delete a department by ID
  deleteDepartment: async (departmentId) => {
    const id = Number(departmentId);
    return db.delete(departments).where(eq(departments.departmentId, id));
  }
};