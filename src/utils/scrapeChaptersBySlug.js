import axios from "axios";
import * as cheerio from "cheerio";
import "dotenv/config";

const SAILMG_BASE_URL = process.env.SAILMG_BASE_URL;

export const scrapeChaptersBySlug = async (slug) => {
  if (!slug) throw new Error("Slug is required");

  const mangaUrl = new URL(`/content/${slug}`, SAILMG_BASE_URL).toString();

  try {
    const { data } = await axios.get(mangaUrl);
    const $ = cheerio.load(data);

    // Get title
    const title = $("h1.page-header").first().text().trim();
    if (!title) return null; // Manga tidak ditemukan

    // Get thumbnail
    let thumb = $(".field-name-field-image2 img").attr("src") || null;
    if (thumb && !thumb.startsWith("http")) {
      thumb = new URL(thumb, SAILMG_BASE_URL).toString();
    }

    // Get chapter rows
    const chapterRows = $(".chlist tbody tr");
    const chapters = chapterRows
      .map((_, row) => {
        const rowEl = $(row);
        const anchor = rowEl.find("td.active a");

        if (!anchor || !anchor.attr("href")) return null;

        const href = anchor.attr("href");
        const chapterTitle = anchor.text().trim();
        const chapterSlug = href.split("/").pop();
        const chapterUrl = new URL(href, SAILMG_BASE_URL).toString();
        const date = rowEl.find("td").eq(1).text().trim();

        return {
          slug: chapterSlug,
          title: chapterTitle,
          url: chapterUrl,
          date,
        };
      })
      .get()
      .filter(Boolean); // buang yang null

    return {
      title,
      slug,
      url: mangaUrl,
      thumb,
      chapters,
    };
  } catch (err) {
    if (err.response?.status === 404) {
      return null; // Manga tidak ditemukan
    }
    console.error("scrapeChaptersBySlug error:", err.message);
    throw err;
  }
};

export default scrapeChaptersBySlug;
