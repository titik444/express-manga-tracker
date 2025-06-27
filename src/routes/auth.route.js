import { Router } from "express";
import { getCurrentUser, loginUser, refreshToken } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/AccessValidation.js";

const authRouter = Router();

authRouter.post("/auth/login", loginUser);

authRouter.get("/auth/me", authenticate, getCurrentUser);

authRouter.get("/auth/refresh", refreshToken);

export default authRouter;
