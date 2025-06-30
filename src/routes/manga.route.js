import { Router } from "express";
import {
  getLatestUpdates,
  getMostPopular,
  getNewManga,
  getGenres,
  getMangaByGenre,
  getChaptersBySlug,
  searchManga,
} from "../controllers/manga.controller.js";

const mangaRouter = Router();

mangaRouter.get("/manga/latest-updates", getLatestUpdates);
mangaRouter.get("/manga/most-popular", getMostPopular);
mangaRouter.get("/manga/new-manga", getNewManga);
mangaRouter.get("/manga/genres", getGenres);
mangaRouter.get("/manga/genres/:genre", getMangaByGenre);
mangaRouter.get("/manga/:slug/chapter", getChaptersBySlug);
mangaRouter.get("/manga/search", searchManga);

export default mangaRouter;
