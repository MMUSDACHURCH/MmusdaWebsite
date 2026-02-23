import express from "express";
import { register, verify, login } from "./auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);