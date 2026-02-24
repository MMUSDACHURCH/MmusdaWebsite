import { PrayerRequestsService } from "./prayerRequest.service.js";

const PrayerRequestsController = {
  getAll: async (req, res) => {
    const data = await PrayerRequestsService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const data = await PrayerRequestsService.create(req.body);
    res.status(201).json(data);
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await PrayerRequestsService.update(id, req.body);
    res.json(data);
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    await PrayerRequestsService.delete(id);
    res.json({ message: "Prayer request deleted" });
  },

  getById: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await PrayerRequestsService.getById(id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  }
};

export default PrayerRequestsController;