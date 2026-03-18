import { FamiliesService } from "./families.service.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "families" },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const FamiliesController = {
  getAll: async (req, res) => {
    try {
      const data = await FamiliesService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch families" });
    }
  },

  create: async (req, res) => {
    try {
      const familyData = { ...req.body };
      if (req.file) {
        familyData.photoUrl = await uploadToCloudinary(req.file.buffer);
      }
      const data = await FamiliesService.create(familyData);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create family" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const familyData = { ...req.body };
      if (req.file) {
        familyData.photoUrl = await uploadToCloudinary(req.file.buffer);
      }
      const data = await FamiliesService.update(id, familyData);
      if (!data) return res.status(404).json({ message: "Family not found" });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update family" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await FamiliesService.delete(id);
      res.json({ message: "Family deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete family" });
    }
  },
};

export default FamiliesController;