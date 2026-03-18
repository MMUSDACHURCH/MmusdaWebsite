import { HomeChurchesService } from "./homechurches.service.js";

const HomeChurchesController = {
  getAll: async (req, res) => {
    const data = await HomeChurchesService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const data = await HomeChurchesService.create(req.body);
    res.status(201).json(data);
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await HomeChurchesService.update(id, req.body);
    res.json(data);
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    await HomeChurchesService.delete(id);
    res.json({ message: "Home church deleted" });
  }
};

export default HomeChurchesController;