import { offeringDetailsService } from "./offeringDetails.service.js";

export const offeringDetailsController = {
  getAll: async (req, res) => {
    try {
      const details = await offeringDetailsService.getAll();
      res.status(200).json(details);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch offering details." });
    }
  },

  create: async (req, res) => {
    try {
      const { name, phoneNumber } = req.body;
      const created = await offeringDetailsService.create({ name, phoneNumber });
      res.status(201).json(created[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to create offering detail." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phoneNumber } = req.body;
      const updated = await offeringDetailsService.update(Number(id), { name, phoneNumber });
      if (updated.length === 0) {
        return res.status(404).json({ error: "Record not found." });
      }
      res.status(200).json(updated[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to update offering detail." });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await offeringDetailsService.delete(Number(id));
      if (deleted.length === 0) {
        return res.status(404).json({ error: "Record not found." });
      }
      res.status(200).json(deleted[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to delete offering detail." });
    }
  },
};