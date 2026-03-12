import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);
    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "SET" : "NOT SET");
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await authService.registerAdmin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    console.log("Verify request body:", req.body);

    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const result = await authService.verifyAdmin({ email, code });
    res.status(200).json(result);
  } catch (err) {
    console.error("Verify error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await authService.loginAdmin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const requestReset = async (req, res) => {
  try {
    console.log("Request reset body:", req.body);

    if (!req.body.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await authService.requestPasswordReset(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error("Request reset error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const verifyReset = async (req, res) => {
  try {
    console.log("Verify reset body:", req.body);

    if (!req.body.email || !req.body.code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const result = await authService.verifyResetCode(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error("Verify reset error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    console.log("Reset password body:", req.body);

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Email and new password are required" });
    }

    const result = await authService.resetPassword(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ error: err.message });
  }
};