import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.registerAdmin({ email, password });
    res.status(200).json({ message: "Verification code sent to email", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    await authService.verifyAdmin({ email, code });
    res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginAdmin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};