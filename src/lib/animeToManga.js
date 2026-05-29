import { searchManga } from "./api";

/**
 * @param {string} title - عنوان انیمه
 * @returns {Promise<{found: boolean, mal_id?: number, url?: string}>}
 */
export async function findMangaByTitle(title) {
	if (!title) return { found: false };
	try {
		const data = await searchManga(title);
		if (data.data && data.data.length > 0) {
			const manga = data.data[0];
			return {
				found: true,
				mal_id: manga.mal_id,
				url: `/manga/${manga.mal_id}`,
			};
		}
		return { found: false };
	} catch (err) {
		console.error("Failed to find manga for:", title, err);
		return { found: false };
	}
}