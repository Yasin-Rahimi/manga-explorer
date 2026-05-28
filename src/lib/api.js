import axios from "axios";

const api = axios.create({
    baseURL: "https://api.jikan.moe/v4",
    timeout: 10000
});

export async function getTopManga(page = 1) {
    const res = await api.get(`/top/manga?page=${page}`);
    return res.data;
}

export async function searchManga(query, options = {}) {
    const res = await api.get(`/manga?q=${query}`, { signal: options.signal });
    return res.data;
}

export async function getMangaById(id) {
    const res = await api.get(`/manga/${id}`);
    return res.data;
}

export async function getMangaReviews(mangaId) {
    const res = await api.get(`/manga/${mangaId}/reviews`);
    return res.data;
}

export async function searchMangaByTitle(title) {
    try {
        const response = await api.get(`/manga?q=${encodeURIComponent(title)}&limit=1`);
        if (response.data.data && response.data.data.length > 0) {
            const manga = response.data.data[0];
            return {
                found: true,
                id: manga.mal_id,
                title: manga.title,
                url: `/manga/${manga.mal_id}`
            };
        }
        return { found: false };
    } catch (error) {
        console.error("Jikan search error:", error);
        return { found: false };
    }
}