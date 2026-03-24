import { PatronsService } from "./patrons.service.js";
import cloudinary from "../utils/cloudinary.js";

const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "patrons" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

const PatronsController = {
  getAll: async (req, res) => {
    try {
      const data = await PatronsService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = { ...req.body };

      if (req.file) {
        const result = await streamUpload(req.file.buffer);
        data.image = result.secure_url;
      }

      const created = await PatronsService.create(data);
      res.status(201).json(created);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = { ...req.body };

      if (req.file) {
        const result = await streamUpload(req.file.buffer);
        data.image = result.secure_url;
      }

      const updated = await PatronsService.update(id, data);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await PatronsService.delete(id);
      res.json({ message: "Patron deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default PatronsController;