import { MembershipTransfersService } from "./membershipTransfers.service.js";

const MembershipTransfersController = {
  getAll: async (req, res) => {
    try {
      const data = await MembershipTransfersService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const created = await MembershipTransfersService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await MembershipTransfersService.update(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await MembershipTransfersService.delete(id);
      res.json({ message: "Transfer record deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default MembershipTransfersController;