import { BaptismsService } from "./baptisms.service.js";

const BaptismsController = {
  getAll: async (req, res) => {
    try {
      const data = await BaptismsService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const created = await BaptismsService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await BaptismsService.update(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await BaptismsService.delete(id);
      res.json({ message: "Baptism record deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default BaptismsController;