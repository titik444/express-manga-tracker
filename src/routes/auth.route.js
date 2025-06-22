import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";

const authRouter = Router();

authRouter.post("/auth/login", loginUser);

export default authRouter;
