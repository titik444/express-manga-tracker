import prisma from "../utils/client.js";
import scrapeChaptersBySlug from "../utils/scrapeChaptersBySlug.js";

export const createWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Slug is required", data: null });
    }

    const exists = await prisma.watchlist.findFirst({
      where: { userId, slug },
    });

    if (exists) {
      return res
        .status(409)
        .json({ message: "Manga already in watchlist", data: null });
    }

    const mangaData = await scrapeChaptersBySlug(slug);

    if (!mangaData) {
      return res.status(404).json({
        message: "Manga not found on source site",
        data: null,
      });
    }

    const { title, url, thumb, chapters } = mangaData;
    const latestChapter = chapters[0];

    // Simpan watchlist beserta semua chapter
    const newWatchlist = await prisma.watchlist.create({
      data: {
        userId,
        title,
        slug,
        url,
        thumb,
        latestChapterSlug: latestChapter.slug,
        chapters: {
          create: chapters.map((ch) => ({
            title: ch.title,
            slug: ch.slug,
            url: ch.url,
            date: new Date(ch.date), // <== konversi ke Date agar sesuai Prisma
          })),
        },
      },
      include: {
        chapters: true,
      },
    });

    res.json({
      message: "Watchlist created successfully",
      data: newWatchlist,
    });
  } catch (err) {
    console.error("Error in createWatchlist:", err.message);
    res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

export const listWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const watchlist = await prisma.watchlist.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        slug: true,
        url: true,
        thumb: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json({
      message: "Watchlist fetched successfully",
      data: watchlist,
    });
  } catch (err) {
    console.error("Error in listWatchlist:", err.message);
    res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

export const listWatchlistChapters = async (req, res) => {
  try {
    const allWatchlists = await prisma.watchlist.findMany({
      include: { chapters: true },
    });

    const allChapters = [];

    for (const watchlist of allWatchlists) {
      const scraped = await scrapeChaptersBySlug(watchlist.slug);

      if (!scraped?.chapters?.length) {
        allChapters.push(
          ...watchlist.chapters.map((ch) => ({
            id: ch.id,
            watchlistId: watchlist.id,
            title: ch.title,
            slug: ch.slug,
            url: ch.url,
            date: ch.date,
          }))
        );
        continue;
      }

      const latestScrapedSlug = scraped.chapters[0].slug;

      if (latestScrapedSlug !== watchlist.latestChapterSlug) {
        // Hapus dan update jika ada update
        await prisma.chapter.deleteMany({
          where: { watchlistId: watchlist.id },
        });

        await prisma.watchlist.update({
          where: { id: watchlist.id },
          data: {
            title: scraped.title,
            url: scraped.url,
            thumb: scraped.thumb,
            latestChapterSlug: latestScrapedSlug,
            chapters: {
              create: scraped.chapters.map((ch) => ({
                title: ch.title,
                slug: ch.slug,
                url: ch.url,
                date: new Date(ch.date),
              })),
            },
          },
        });

        // Ambil ulang chapter yg baru disimpan
        const updatedChapters = scraped.chapters.map((ch) => ({
          id: crypto.randomUUID(), // placeholder, kamu bisa ambil dari DB kalau perlu ID asli
          watchlistId: watchlist.id,
          title: ch.title,
          slug: ch.slug,
          url: ch.url,
          date: new Date(ch.date),
        }));

        allChapters.push(...updatedChapters);
      } else {
        // Tidak ada update
        allChapters.push(
          ...watchlist.chapters.map((ch) => ({
            id: ch.id,
            watchlistId: watchlist.id,
            title: ch.title,
            slug: ch.slug,
            url: ch.url,
            date: ch.date,
          }))
        );
      }
    }

    // Urutkan dari yang terbaru
    allChapters.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      message: "Watchlist fetched and synced",
      data: allChapters,
    });
  } catch (err) {
    console.error("Error in getAllWatchlist:", err.message);
    res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

export const deleteWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        message: "Slug is required",
        data: null,
      });
    }

    const watchlist = await prisma.watchlist.findFirst({
      where: {
        userId,
        slug,
      },
    });

    if (!watchlist) {
      return res.status(404).json({
        message: "Watchlist not found",
        data: null,
      });
    }

    // Hapus chapters terlebih dahulu karena relasi 1-N
    await prisma.chapter.deleteMany({
      where: {
        watchlistId: watchlist.id,
      },
    });

    // Hapus watchlist-nya
    await prisma.watchlist.delete({
      where: {
        id: watchlist.id,
      },
    });

    res.json({
      message: "Watchlist deleted successfully",
      data: {
        slug,
      },
    });
  } catch (err) {
    console.error("Error in deleteWatchlist:", err.message);
    res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};
