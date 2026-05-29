import { redirect } from "react-router";
import { searchManga } from "../lib/api";

const ERROR_MESSAGE = "Failed to search manga.";

export async function searchLoader({ request }) {

    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    if (!query) {
        return { query: "", results: [], error: null };
    }

    try {
        const data = await searchManga(query);
        return { query, results: data?.data ?? [], error: null };
    } catch {
        return { query, results: [], error: ERROR_MESSAGE };
    }
    
}

export async function searchAction({ request }) {
    const formData = await request.formData();
    const query = formData.get("q");

    if (!query || typeof query !== "string" || query.trim() === "") {
        return redirect("/search");
    }

    return redirect(`/search?q=${encodeURIComponent(query.trim())}`);
}