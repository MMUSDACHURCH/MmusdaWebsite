import { FamiliesService } from "./families.service.js";

const FamiliesController = {
  getAll: async (req, res) => {
    try {
      const data = await FamiliesService.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch families" });
    }
  },

  create: async (req, res) => {
    try {
      const data = await FamiliesService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create family" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await FamiliesService.update(id, req.body);
      if (!data) return res.status(404).json({ message: "Family not found" });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update family" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await FamiliesService.delete(id);
      res.json({ message: "Family deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete family" });
    }
  }
};

export default FamiliesController;