import { PastorsService } from "./pastors.service.js";
import cloudinary from "../utils/cloudinary.js";

const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pastors" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

const PastorsController = {
  getAll: async (req, res) => {
    try {
      const data = await PastorsService.getAll();
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

      const created = await PastorsService.create(data);
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

      const updated = await PastorsService.update(id, data);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await PastorsService.delete(id);
      res.json({ message: "Pastor deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default PastorsController;