import axios from "axios";

const api = axios.create({
    baseURL: "https://api.jikan.moe/v4",
});

/**
 * Fetches top manga with pagination.
 */
export async function getTopManga(page = 1) {
    const res = await api.get(`/top/manga?page=${page}`);
    return res.data;
}

/**
 * Searches manga by query string.
 */
export async function searchManga(query, options = {}) {
    const res = await api.get(`/manga?q=${query}`, { signal: options.signal });
    return res.data;
}

/**
 * Retrieves a single manga by its MAL id.
 */
export async function getMangaById(id) {
    const res = await api.get(`/manga/${id}`);
    return res.data;
}

/**
 * Fetches user reviews for a manga.
 */
/**
 * Fetches user reviews for a manga.
 * Returns an empty array if the upstream server fails.
 */
export async function getMangaReviews(mangaId) {
    try {
        const res = await api.get(`/manga/${mangaId}/reviews`);
        return res.data;
    } catch (error) {
        // The upstream MyAnimeList server sometimes returns 500.
        // Log it but don't break the whole page.
        console.warn(`Could not fetch reviews for manga ${mangaId}:`, error.message);
        return { data: [] }; // fallback to an empty review list
    }
}
/**
 * Utility to sleep for a given duration (ms).
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Searches for a manga by exact title with built‑in retry on 429 errors.
 * Retries up to 3 times with increasing delays.
 */
export async function searchMangaByTitle(title) {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await api.get(`/manga?q=${encodeURIComponent(title)}&limit=1`);
            if (response.data.data && response.data.data.length > 0) {
                const manga = response.data.data[0];
                return {
                    found: true,
                    id: manga.mal_id,
                    title: manga.title,
                    url: `/manga/${manga.mal_id}`,
                };
            }
            return { found: false };
        } catch (error) {
            if (error.response?.status === 429) {
                attempt++;
                if (attempt < maxRetries) {
                    // Exponential backoff: 1s, 2s, 4s
                    const delay = 1000 * Math.pow(2, attempt - 1);
                    console.warn(`Rate limited (429). Retrying in ${delay / 1000}s...`);
                    await sleep(delay);
                } else {
                    console.error("Jikan rate limit exceeded after retries.");
                    return { found: false };
                }
            } else {
                console.error("Jikan search error:", error);
                return { found: false };
            }
        }
    }
}


/**
 * Fetches manga recommendations for a given manga.
 * Returns an empty array on failure.
 */
export async function getMangaRecommendations(mangaId) {
    try {
        const res = await api.get(`/manga/${mangaId}/recommendations`);
        return res.data;
    } catch (error) {
        console.warn(`Could not fetch recommendations for manga ${mangaId}:`, error.message);
        return { data: [] };
    }
}
