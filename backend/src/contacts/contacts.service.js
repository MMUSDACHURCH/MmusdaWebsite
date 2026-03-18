import { db } from "../Drizzle/db.js";
import { contacts } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const ContactService = {
  // Create a new contact
  createContact: async ({ name, email, phone, message }) => {
    const result = await db.insert(contacts).values({
      name,
      email,
      phone: phone || null,
      message: message || null
    }).returning();
    return result[0];
  },

  // Get all contacts
  getAllContacts: async () => {
    return db.select().from(contacts).orderBy(contacts.createdAt, "desc");
  },

  // Delete contact by ID
  deleteContact: async (contactId) => {
    const id = Number(contactId);
    return db.delete(contacts).where(eq(contacts.contactId, id));
  }
};