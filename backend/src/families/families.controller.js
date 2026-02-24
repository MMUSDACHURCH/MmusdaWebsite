import { FamiliesService } from "./families.service.js";

const FamiliesController = {
  getAll: async (req, res) => {
    const data = await FamiliesService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const data = await FamiliesService.create(req.body);
    res.status(201).json(data);
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await FamiliesService.update(id, req.body);
    res.json(data);
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    await FamiliesService.delete(id);
    res.json({ message: "Family deleted" });
  }
};

export default FamiliesController;