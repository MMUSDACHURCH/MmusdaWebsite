import { AnnouncementsService } from "./announcements.service.js";

const AnnouncementsController = {
  getAll: async (req, res) => {
    const data = await AnnouncementsService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const data = await AnnouncementsService.create(req.body);
    res.status(201).json(data);
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await AnnouncementsService.update(id, req.body);
    res.json(data);
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    await AnnouncementsService.delete(id);
    res.json({ message: "Announcement deleted" });
  },

  getByDate: async (req, res) => {
    const { from, to } = req.query;
    const results = await AnnouncementsService.getByDate(from, to);
    res.json(results);
  }
};

export default AnnouncementsController;