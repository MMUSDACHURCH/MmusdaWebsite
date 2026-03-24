import express from "express";
import { subscribeController } from "./subscribe.controller.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/subscribe", subscribeController);

export default subscribeRouter;