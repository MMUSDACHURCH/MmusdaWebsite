import { PastorsService } from "./pastors.service.js";

const PastorsController = {
  getAll: async (req, res) => {
    try {
      const data = await PastorsService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.file) {
        data.image = `/uploads/pastors/${req.file.filename}`;
      }
      const created = await PastorsService.create(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = { ...req.body };
      if (req.file) {
        data.image = `/uploads/pastors/${req.file.filename}`;
      }
      const updated = await PastorsService.update(id, data);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await PastorsService.delete(id);
      res.json({ message: "Pastor deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default PastorsController;