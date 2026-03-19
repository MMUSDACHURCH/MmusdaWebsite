import * as service from "./testimonies.service.js";

export const create = async (req, res) => {
  try {
    const result = await service.createTestimony(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const result = await service.getAllTestimonies(limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const result = await service.updateTestimony(Number(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await service.deleteTestimony(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};