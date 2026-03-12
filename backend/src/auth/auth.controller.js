import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const result = await authService.registerAdmin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: "Email and code are required" });

    const result = await authService.verifyAdmin({ email, code });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const result = await authService.loginAdmin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const requestReset = async (req, res) => {
  try {
    if (!req.body.email) return res.status(400).json({ error: "Email is required" });

    const result = await authService.requestPasswordReset(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyReset = async (req, res) => {
  try {
    if (!req.body.email || !req.body.code) return res.status(400).json({ error: "Email and code are required" });

    const result = await authService.verifyResetCode(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    if (!req.body.email || !req.body.newPassword) 
      return res.status(400).json({ error: "Email and new password are required" });

    const result = await authService.resetPassword(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};