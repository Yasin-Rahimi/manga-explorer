const { Manga, Chapter } = require('mangadex-full-api');

function formatManga(manga) {
    return {
        id: manga.id,
        title: manga.localTitle || manga.title?.en || 'Untitled',
        description: manga.description?.en || '',
        coverImage: manga.coverImage?.original || manga.coverImage?.medium || null,
        status: manga.status || 'unknown',
        tags: manga.tags?.map(t => t.name?.en) || [],
        contentRating: manga.contentRating,
        createdAt: manga.createdAt,
        updatedAt: manga.updatedAt,
    };
}

function formatChapter(chapter) {
    return {
        id: chapter.id,
        title: chapter.title || `Chapter ${chapter.chapterNumber}`,
        chapterNumber: chapter.chapterNumber,
        volume: chapter.volume,
        translatedLanguage: chapter.translatedLanguage,
        publishAt: chapter.publishAt,
        pages: chapter.pages,
        scanlationGroup: chapter.scanlationGroup?.name || null,
    };
}

async function searchManga(query, limit = 10, offset = 0) {
    const mangas = await Manga.search({
        title: query,
        limit,
        offset,
        hasAvailableChapters: true,
    });
    return {
        data: mangas.map(formatManga),
        total: mangas.total || mangas.length,
        limit,
        offset,
    };
}

async function getMangaById(id) {
    const manga = await Manga.get(id);
    return formatManga(manga);
}

async function getChapters(mangaId, limit = 30, offset = 0) {
    const manga = await Manga.get(mangaId);
    const chapters = await manga.getFeed({
        translatedLanguage: ['en'],
        limit,
        offset,
        order: { chapter: 'desc' },
    });
    return {
        data: chapters.map(formatChapter),
        total: chapters.total || chapters.length,
        limit,
        offset,
    };
}

async function getChapterPages(chapterId) {
    const chapter = await Chapter.get(chapterId);
    const pages = await chapter.getReadablePages();
    return {
        chapterId,
        pages,
    };
}

module.exports = { searchManga, getMangaById, getChapters, getChapterPages };
