import { offeringDetailsService } from "./offeringDetails.service.js";

export const offeringDetailsController = {
  // GET /offering-details
  getAll: async (req, res) => {
    try {
      const details = await offeringDetailsService.getAll();
      res.status(200).json(details);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch offering details." });
    }
  },

  // PUT /offering-details/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phoneNumber } = req.body;

      const updated = await offeringDetailsService.update(Number(id), {
        name,
        phoneNumber,
      });

      if (updated.length === 0) {
        return res.status(404).json({ error: "Record not found." });
      }

      res.status(200).json(updated[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update offering details." });
    }
  },
};