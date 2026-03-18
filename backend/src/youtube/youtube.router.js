import express from "express";
import { getLatestVideo } from "./youtube.controller.js";

const youtubeRouter = express.Router();

youtubeRouter.get("/latest-videos", getLatestVideo);

export default youtubeRouter;
