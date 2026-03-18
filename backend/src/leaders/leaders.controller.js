import { LeaderService } from "./leaders.service.js";

export const LeaderController = {
  // Create a leader
  create: async (req, res) => {
    try {
      const { name, department, contactInfo, role } = req.body;
      const leader = await LeaderService.createLeader({ name, department, contactInfo, role });
      res.status(201).json({ message: "Leader created successfully", leader });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create leader" });
    }
  },

  // Get all leaders
  getAll: async (req, res) => {
    try {
      const leaders = await LeaderService.getAllLeaders();
      res.status(200).json({ leaders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch leaders" });
    }
  },

  // Get leaders by role
  getByRole: async (req, res) => {
    try {
      const { role } = req.query;
      if (!role) return res.status(400).json({ message: "Role query parameter is required" });
      const leaders = await LeaderService.getLeadersByRole(role);
      res.status(200).json({ leaders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch leaders by role" });
    }
  },

  // Update leader by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await LeaderService.updateLeader(id, data);
      if (!updated) return res.status(404).json({ message: `Leader with ID ${id} not found` });
      res.status(200).json({ message: "Leader updated successfully", leader: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update leader" });
    }
  },

  // Delete leader by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await LeaderService.deleteLeader(id);
      if (!deleted || deleted.rowCount === 0) {
        return res.status(404).json({ message: `Leader with ID ${id} not found` });
      }
      res.status(200).json({ message: `Leader with ID ${id} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete leader" });
    }
  }
};