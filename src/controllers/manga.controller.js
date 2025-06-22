import "dotenv/config";
import axios from "axios";
import * as cheerio from "cheerio";

const SAILMG_BASE_URL = process.env.SAILMG_BASE_URL;

export const getLatestUpdates = async (req, res) => {
  try {
    const { data } = await axios.get(SAILMG_BASE_URL);
    const $ = cheerio.load(data);
    const updates = [];

    const getSlugFromUrl = (url) => url?.split("/").filter(Boolean).pop() || "";

    const cleanThumbnailUrl = (url) =>
      url?.replace("/styles/minicover/public", "") || "";

    $("#latest-list > li").each((_, element) => {
      const $element = $(element);

      const title = $element.find(".tl strong").text().trim();
      const rawUrl = $element.find("> a").attr("href");
      const rawThumb = $element.find("> a > img").attr("src");

      const slug = getSlugFromUrl(rawUrl);
      const thumb = cleanThumbnailUrl(rawThumb);
      const fullUrl = new URL(rawUrl, SAILMG_BASE_URL).toString();

      const chapters = [];
      $element.find("#c-list li").each((_, chapterEl) => {
        const chapterTitle = $(chapterEl).find("a").text().trim();
        const chapterUrl = $(chapterEl).find("a").attr("href");

        if (chapterTitle && chapterUrl) {
          chapters.push({
            title: chapterTitle,
            url: new URL(chapterUrl, SAILMG_BASE_URL).toString(),
          });
        }
      });

      updates.push({
        title,
        slug,
        url: fullUrl,
        thumb,
        chapters,
        latestChapter: chapters[0] || null,
      });
    });

    res.json({
      message: "Get latest updates success",
      data: updates,
    });
  } catch (err) {
    console.error("Error in getLatestUpdates:", err.message);
    res.status(500).json({
      message: "Failed to fetch latest updates",
      data: null,
    });
  }
};

export const getMostPopular = async (req, res) => {
  try {
    const { data } = await axios.get(SAILMG_BASE_URL);

    const $ = cheerio.load(data);
    const popular = [];

    const getSlugFromUrl = (url) => url?.split("/").filter(Boolean).pop() || "";

    const cleanThumbnailUrl = (url) =>
      url?.replace("/styles/minicover/public", "") || "";

    // Scope hanya dalam #block-showmanga-hot-manga
    const $hotMangaSection = $("#block-showmanga-hot-manga");

    $hotMangaSection.find("#new-list > li").each((_, element) => {
      const $element = $(element);

      const title = $element.find(".tl a").text().trim();
      const rawUrl = $element.find("> a").attr("href");
      const rawThumb = $element.find("> a > img").attr("src");

      const slug = getSlugFromUrl(rawUrl);
      const thumb = cleanThumbnailUrl(rawThumb);
      const fullUrl = new URL(rawUrl, SAILMG_BASE_URL).toString();

      const latestChapterEl = $element.find(".cl a");
      const latestChapter = {
        title: latestChapterEl.text().trim(),
        url: new URL(latestChapterEl.attr("href"), SAILMG_BASE_URL).toString(),
      };

      popular.push({
        title,
        slug,
        url: fullUrl,
        thumb,
        latestChapter,
      });
    });

    res.json({ message: "Get most popular success", data: popular });
  } catch (err) {
    console.error("Error in getMostPopular:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch most popular manga", data: null });
  }
};

export const getNewManga = async (req, res) => {
  try {
    const { data } = await axios.get(SAILMG_BASE_URL);

    const $ = cheerio.load(data);
    const newManga = [];

    const getSlugFromUrl = (url) => url?.split("/").filter(Boolean).pop() || "";

    const cleanThumbnailUrl = (url) =>
      url?.replace("/styles/minicover/public", "") || "";

    const $section = $("#block-showmanga-new-manga");

    $section.find("#new-list > li").each((i, element) => {
      const $element = $(element);

      const title = $element.find(".tl a").text().trim();
      const rawUrl = $element.find("> a").attr("href");
      const rawThumb = $element.find("> a > img").attr("src");

      const slug = getSlugFromUrl(rawUrl);
      const thumb = cleanThumbnailUrl(rawThumb);
      const fullUrl = new URL(rawUrl, SAILMG_BASE_URL).toString();

      const chapterEl = $element.find(".cl a");
      const latestChapter = {
        title: chapterEl.text().trim(),
        url: new URL(chapterEl.attr("href"), SAILMG_BASE_URL).toString(),
      };

      newManga.push({
        title,
        slug,
        url: fullUrl,
        thumb,
        latestChapter,
      });
    });

    res.json({ message: "Get new manga success", data: newManga });
  } catch (err) {
    console.error("Error in getNewManga:", err.message);
    res.status(500).json({ message: "Failed to fetch new manga", data: null });
  }
};

export const getGenres = async (req, res) => {
  try {
    const url = new URL("tagclouds/chunk/1", SAILMG_BASE_URL).toString();
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const genres = [];

    $(".wrapper.tagclouds .tagclouds-term a").each((_, el) => {
      const name = $(el).text().trim();
      const href = $(el).attr("href")?.trim();

      // Validasi: href harus diawali dengan "/tags/"
      if (name && href && /^\/tags\/[\w-]+$/.test(href)) {
        const slug = href.replace(/^\/tags\//, "");
        genres.push({
          name,
          url: `/api/genres/${slug}`,
        });
      }
    });

    res.json({
      message: "Get genres success",
      data: genres,
    });
  } catch (err) {
    console.error("Error in getGenres:", err.message);
    res.status(500).json({
      message: "Failed to fetch genres",
      data: null,
    });
  }
};

export const getMangaByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const page = parseInt(req.query.page, 10) || 1;

    if (!genre) {
      return res.status(400).json({ message: "Genre is required", data: null });
    }

    // Construct URL based on page (1-based)
    const pageOffset = page - 1;
    const relativePath =
      pageOffset === 0 ? `/tags/${genre}` : `/tags/${genre}?page=${pageOffset}`;
    const genreUrl = new URL(relativePath, SAILMG_BASE_URL).toString();

    const { data } = await axios.get(genreUrl);
    const $ = cheerio.load(data);
    const mangaList = [];

    const getSlugFromUrl = (url) => url?.split("/").filter(Boolean).pop() || "";

    const cleanThumbnailUrl = (url) =>
      url?.replace("/styles/cover/public", "") || "";

    // Extract manga list
    $(".view-content .views-row").each((_, el) => {
      const element = $(el);
      const title = element
        .find(".views-field-title .field-content a")
        .text()
        .trim();

      const rawUrl = element
        .find(".views-field-title .field-content a")
        .attr("href");
      const rawThumb = element.find(".views-field-field-image2 img").attr("src");
      const description = element
        .find(".views-field-body .field-content")
        .text()
        .trim();

      const slug = getSlugFromUrl(rawUrl);
      const thumb = cleanThumbnailUrl(rawThumb);
      const fullUrl = new URL(rawUrl, SAILMG_BASE_URL).toString();

      if (title && fullUrl) {
        mangaList.push({ title, slug, url: fullUrl, thumb, description });
      }
    });

    // Handle pagination
    const pageNumbers = [];

    // From <a href="?page=n">
    $(".pagination li a").each((_, el) => {
      const href = $(el).attr("href");
      const match = href?.match(/page=(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10) + 1;
        pageNumbers.push(num);
      }
    });

    // From <li class="active"><span>n</span>
    const activePage = parseInt($(".pagination li.active span").text(), 10);
    if (!isNaN(activePage)) {
      pageNumbers.push(activePage);
    }

    const totalPages = pageNumbers.length > 0 ? Math.max(...pageNumbers) : page;

    if (page > totalPages) {
      return res.status(404).json({ message: "Page not found", data: null });
    }

    res.json({
      message: `Get manga by genre ${genre} success`,
      data: mangaList,
      pagination: {
        currentPage: page,
        perPage: 10,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error in getMangaByGenre:", err.message);
    res.status(500).json({
      message: "Failed to fetch manga by genre",
      data: null,
    });
  }
};
