import { AnnouncementService } from "./announcements.service.js";

export const AnnouncementController = {
  // Create a new announcement
  create: async (req, res) => {
    try {
      const { title, description, createdBy } = req.body;
      const announcement = await AnnouncementService.createAnnouncement({ title, description, createdBy });
      res.status(201).json({
        message: "Announcement created successfully",
        announcement
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create announcement" });
    }
  },

  // Get all announcements
  getAll: async (req, res) => {
    try {
      const announcements = await AnnouncementService.getAllAnnouncements();
      res.status(200).json({ announcements });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  },

  // Get announcements by date range
  getByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "startDate and endDate are required" });
      }

      // Convert strings to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      const announcements = await AnnouncementService.getAnnouncementsByDate({ startDate: start, endDate: end });

      res.status(200).json({ announcements });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch announcements by date" });
    }
  },

  // Update announcement by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await AnnouncementService.updateAnnouncement(Number(id), data);

      if (!updated) {
        return res.status(404).json({ message: `Announcement with ID ${id} not found` });
      }

      res.status(200).json({
        message: "Announcement updated successfully",
        announcement: updated
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update announcement" });
    }
  },

  // Delete announcement by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AnnouncementService.deleteAnnouncement(Number(id));

      // Drizzle delete returns number of affected rows (if supported)
      if (!deleted || deleted.rowCount === 0) {
        return res.status(404).json({ message: `Announcement with ID ${id} not found` });
      }

      res.status(200).json({ message: `Announcement with ID ${id} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete announcement" });
    }
  }
};