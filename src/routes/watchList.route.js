import { Router } from "express";
import { authenticate } from "../middleware/AccessValidation.js";
import {
  createWatchlist,
  deleteWatchlist,
  listWatchlist,
  listWatchlistChapters,
} from "../controllers/watchList.controller.js";

const watchListRouter = Router();

watchListRouter.get("/watchList", authenticate, listWatchlist);
watchListRouter.get("/watchList/chapters", listWatchlistChapters);
watchListRouter.post("/watchList/:slug", authenticate, createWatchlist);
watchListRouter.delete("/watchList/:slug", authenticate, deleteWatchlist);

export default watchListRouter;
