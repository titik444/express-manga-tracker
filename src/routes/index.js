import { Router } from "express";
import mangaRouter from "./manga.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/api", authRouter);
router.use("/api", mangaRouter);
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    data: null,
  });
});

export default router;
