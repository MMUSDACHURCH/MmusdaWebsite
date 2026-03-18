// members.controller.js
import { MembersService } from "./members.service.js";

export const MembersController = {
  // Create member
  async createMember(req, res) {
    try {
      const data = req.body;
      const newMember = await MembersService.createMember(data);
      res.status(201).json(newMember);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get all members
  async getAllMembers(req, res) {
    try {
      const members = await MembersService.getAllMembers();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete member
  async deleteMember(req, res) {
    try {
      const { id } = req.params;
      await MembersService.deleteMember(Number(id));
      res.json({ message: "Member deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get by area of residence
  async getByArea(req, res) {
    try {
      const { area } = req.params;
      const results = await MembersService.getByArea(area);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};