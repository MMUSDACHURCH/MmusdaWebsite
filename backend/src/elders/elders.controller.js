import { EldersService } from "./elders.service.js";

const EldersController = {
  getAll: async (req, res) => {
    try {
      const data = await EldersService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.file) {
        data.image = `/uploads/elders/${req.file.filename}`;
      }
      const created = await EldersService.create(data);
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
        data.image = `/uploads/elders/${req.file.filename}`;
      }
      const updated = await EldersService.update(id, data);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await EldersService.delete(id);
      res.json({ message: "Elder deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default EldersController;