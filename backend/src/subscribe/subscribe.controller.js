import { subscribeService } from "./subscribe.service.js";

export const subscribeController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await subscribeService(email);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};