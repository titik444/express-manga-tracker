import { Router } from "express";
import {
  getLatestUpdates,
  getMostPopular,
  getNewManga,
  getGenres,
  getMangaByGenre,
} from "../controllers/manga.controller.js";

const mangaRouter = Router();

mangaRouter.get("/latest-updates", getLatestUpdates);
mangaRouter.get("/most-popular", getMostPopular);
mangaRouter.get("/new-manga", getNewManga);
mangaRouter.get("/genres", getGenres);
mangaRouter.get("/genres/:genre", getMangaByGenre);

export default mangaRouter;
