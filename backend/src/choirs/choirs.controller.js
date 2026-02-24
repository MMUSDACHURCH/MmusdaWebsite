import { ChoirsService } from "./choirs.service.js";

const ChoirsController = {
  getAll: async (req, res) => {
    const data = await ChoirsService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const data = await ChoirsService.create(req.body);
    res.status(201).json(data);
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await ChoirsService.update(id, req.body);
    res.json(data);
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    await ChoirsService.delete(id);
    res.json({ message: "Choir deleted" });
  }
};

export default ChoirsController;