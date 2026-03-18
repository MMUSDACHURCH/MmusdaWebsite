import { AnnouncementsService } from "./announcements.service.js";

const AnnouncementsController = {

  getAll: async (req, res) => {
    try {
      const data = await AnnouncementsService.getAll();
      res.json(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const data = await AnnouncementsService.getById(id);

      if (!data) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      res.json(data);

    } catch (error) {
      console.error("Error fetching announcement:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  create: async (req, res) => {
    try {
      const data = await AnnouncementsService.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating announcement:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const data = await AnnouncementsService.update(id, req.body);

      res.json(data);

    } catch (error) {
      console.error("Error updating announcement:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      await AnnouncementsService.delete(id);

      res.json({ message: "Announcement deleted" });

    } catch (error) {
      console.error("Error deleting announcement:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getByDate: async (req, res) => {
    try {
      const { startDate } = req.query;

      const results = await AnnouncementsService.getByDate(startDate);

      res.json(results);

    } catch (error) {
      console.error("Error filtering announcements:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

};

export default AnnouncementsController;