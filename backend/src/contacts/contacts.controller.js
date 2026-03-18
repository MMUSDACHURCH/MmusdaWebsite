import { ContactService } from "./contacts.service.js";

export const ContactController = {
  // Create a new contact
  create: async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      const contact = await ContactService.createContact({ name, email, phone, message });
      res.status(201).json({ message: "Contact created successfully", contact });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create contact" });
    }
  },

  // Get all contacts
  getAll: async (req, res) => {
    try {
      const contacts = await ContactService.getAllContacts();
      res.status(200).json({ contacts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  },

  // Delete contact by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await ContactService.deleteContact(id);

      if (!deleted || deleted.rowCount === 0) {
        return res.status(404).json({ message: `Contact with ID ${id} not found` });
      }

      res.status(200).json({ message: `Contact with ID ${id} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete contact" });
    }
  }
};