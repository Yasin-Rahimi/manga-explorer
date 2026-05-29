import { getMangaById } from "../lib/api";

export async function mangaDetailsLoader({ params }) {
    try {
        const data = await getMangaById(params.id);
        return { manga: data?.data ?? null };
    } catch {
        return { manga: null };
    }

}

