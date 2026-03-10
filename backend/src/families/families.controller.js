import { FamiliesService } from "./families.service.js";

const FamiliesController = {
  getAll: async (req, res) => {
    try {
      const data = await FamiliesService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch families" });
    }
  },

  create: async (req, res) => {
    try {
      const familyData = { ...req.body };

      if (req.file) {
        familyData.photoUrl = `https://mmusda.onrender.com/uploads/${req.file.filename}`;
      }

      const data = await FamiliesService.create(familyData);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ message: "Failed to create family" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const familyData = { ...req.body };

      if (req.file) {
        familyData.photoUrl = `https://mmusda.onrender.com/uploads/${req.file.filename}`;
      }

      const data = await FamiliesService.update(id, familyData);

      if (!data) {
        return res.status(404).json({ message: "Family not found" });
      }

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Failed to update family" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await FamiliesService.delete(id);
      res.json({ message: "Family deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete family" });
    }
  }
};

export default FamiliesController;