import SermonsService from "../sermons/sermons.service.js";

const SermonsController = {
  getInitialSermons: async (req, res) => {
    try {
      const data = await SermonsService.getInitialSermons();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch initial sermons" });
    }
  },

  getAllSermons: async (req, res) => {
    try {
      const data = await SermonsService.getAllSermons();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch sermons" });
    }
  },

  createSermon: async (req, res) => {
    try {
      const { title, sermonDate, videoUrl, description } = req.body;

      if (!title || !sermonDate) {
        return res.status(400).json({ error: "title and sermonDate are required" });
      }

      const sermon = await SermonsService.createSermon({
        title,
        sermonDate,
        videoUrl,
        description
      });

      res.status(201).json(sermon);
    } catch (err) {
      res.status(500).json({ error: "Failed to create sermon" });
    }
  },

  updateSermon: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, sermonDate, videoUrl, description } = req.body;

      const updated = await SermonsService.updateSermon(parseInt(id), {
        title,
        sermonDate,
        videoUrl,
        description
      });

      if (!updated) {
        return res.status(404).json({ error: "Sermon not found" });
      }

      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to update sermon" });
    }
  },

  deleteSermon: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await SermonsService.deleteSermon(parseInt(id));

      if (!deleted) {
        return res.status(404).json({ error: "Sermon not found" });
      }

      res.json({ message: "Sermon deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete sermon" });
    }
  }
};

export default SermonsController;