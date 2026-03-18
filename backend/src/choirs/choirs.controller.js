import { ChoirsService } from "./choirs.service.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "choirs" }, (error, result) => {
      if (result) resolve(result.secure_url);
      else reject(error);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

const ChoirsController = {
  getAll: async (req, res) => {
    try {
      const data = await ChoirsService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.file) {
        data.choirPhoto = await uploadToCloudinary(req.file.buffer);
      }
      const created = await ChoirsService.create(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = { ...req.body };
      if (req.file) {
        data.choirPhoto = await uploadToCloudinary(req.file.buffer);
      } 
      const updated = await ChoirsService.update(id, data);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await ChoirsService.delete(id);
      res.json({ message: "Choir deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default ChoirsController;