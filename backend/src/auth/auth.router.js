import express from "express";
import { register, verify, login, requestReset, verifyReset, resetPassword } from "./auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/forgot-password", requestReset);
authRouter.post("/verify-reset-code", verifyReset);
authRouter.post("/reset-password", resetPassword);