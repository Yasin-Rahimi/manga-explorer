#!/bin/bash

# ── Remove unused files ──
rm -f src/pages/MangaDetails/components/SampleReviews.jsx
rm -f src/pages/MangaDetails/components/ReviewsSummarizer.jsx
rm -f src/pages/MangaDetails/components/MangaSynopsis.jsx
rm -f src/pages/MangaDetails/components/MangaDetailsLoading.jsx
rm -f src/components/common/Header/SearchForm.jsx.bak
rm -f src/components/common/Header/SearchInput.jsx
rm -f src/components/common/Header/SearchSuggestions.jsx

# ── Fix AISearch.jsx ──
cat <<'EOF' > src/pages/AISearch/AISearch.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigation } from "react-router";
import { askAi } from "../../lib/ai/askAi";
import { buildAISearchPrompt } from "../../lib/ai/prompts";
import { searchManga } from "../../lib/api";
import MangaCard from "../../components/common/MangaCard";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import Empty from "../../components/ui/Empty";

export default function AISearch() {

    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const query = searchParams.get("q") || "";
    const loading = navigation.state === "loading" || navigation.state === "submitting";
    const [mangas, setMangas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!query) {
            setError("No search query provided.");
            return;
        }

        const fetchAISuggestions = async () => {
            try {
                const prompt = buildAISearchPrompt(query);
                const aiResponse = await askAi(prompt);
                let titles = [];
                
                try {
                    titles = JSON.parse(aiResponse);
                    if (!Array.isArray(titles)) throw new Error();
                } catch {
                    titles = aiResponse.split(/\n|,/).map(s => s.trim().replace(/[\[\]"']/g, '')).filter(Boolean);
                }

                const uniqueTitles = [...new Map(titles.map(t => [t.toLowerCase(), t])).values()];
                const finalTitles = uniqueTitles.slice(0, 16);

                const mangaPromises = finalTitles.map(async (title) => {
                    try {
                        const result = await searchManga(title);
                        if (result.data && result.data.length > 0) {
                            return result.data[0];
                        }
                        return null;
                    } catch {
                        return null;
                    }
                });

                const results = await Promise.all(mangaPromises);
                const validMangas = results.filter(m => m !== null);
                setMangas(validMangas);

            } catch (err) {
                console.error(err);
                setError("Failed to get AI recommendations. Please try again.");
            }
        };

        fetchAISuggestions();

    }, [query]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading text="AI is finding best matches..." /></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><Error message={error} /></div>;
    if (!loading && mangas.length === 0) return <div className="min-h-screen flex items-center justify-center"><Empty message="No manga found for your description." /></div>;

    return (

        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white py-8 px-4">
            
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-6">
                    
                    <h1 className="text-2xl font-bold mt-2">
                        AI Recommendations for:{" "}
                        <span className="text-purple-400">"{query}"</span>
                    </h1>
                    
                    <p className="text-gray-400 text-sm mt-1">
                        Showing {mangas.length} results
                    </p>
                    
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mangas.map(manga => (
                        <MangaCard key={manga.mal_id} manga={manga} />
                    ))}
                </div>

            </div>

        </div>
    );
}
EOF

# ── Fix MainLayout.jsx ──
cat <<'EOF' > src/layouts/MainLayout.jsx
import { Outlet } from "react-router";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function MainLayout() {

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
EOF

# ── Fix Search.jsx ──
cat <<'EOF' > src/pages/Search/Search.jsx
import { useState } from "react";
import { useLoaderData, useNavigation } from "react-router";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import Empty from "../../components/ui/Empty";
import SearchHeader from "./components/SearchHeader";
import SearchResultsGrid from "./components/SearchResultsGrid";

export default function Search() {

    const { query, results, error } = useLoaderData();
    const navigation = useNavigation();
    const [sort, setSort] = useState("");

    const loading = navigation.state === "loading" || navigation.state === "submitting";

    const handleChangeSort = (value) => {
        if (!value) return;
        setSort(value);
    };

    return (
        <div className="h-fit bg-linear-to-br from-black via-purple-950 to-black text-white flex flex-col">
            <main className="flex-1 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10">
                
                <SearchHeader
                    query={query}
                    loading={loading}
                    onChangeSort={handleChangeSort}
                />

                {loading && (
                    <div className="py-16 sm:py-20">
                        <Loading text="Searching..." />
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                    <SearchResultsGrid results={results} sort={sort} />
                )}

                {error && (
                    <div className="py-16 sm:py-20">
                        <Error message={error} />
                    </div>
                )}

                {!loading && !error && results.length === 0 && query && (
                    <div className="py-16 sm:py-20">
                        <Empty message={`No manga found for "${query}".`} />
                    </div>
                )}

                {!loading && !error && !query && (
                    <div className="py-16 sm:py-20">
                        <Empty message="Enter a search term to find manga." />
                    </div>
                )}
                
            </main>
        </div>
    );
}
EOF

# ── Fix api.js (remove duplicate comment) ──
cat <<'EOF' > src/lib/api.js
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
 * Returns an empty array if the upstream server fails.
 */
export async function getMangaReviews(mangaId) {
    try {
        const res = await api.get(`/manga/${mangaId}/reviews`);
        return res.data;
    } catch (error) {
        console.warn(`Could not fetch reviews for manga ${mangaId}:`, error.message);
        return { data: [] };
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
EOF

# ── Fix ReviewHeader.jsx: remove FaComments import ──
sed -i "s/import { FaComments, FaRobot, FaSpinner, FaEye, FaEyeSlash } from \"react-icons\/fa\";/import { FaRobot, FaSpinner, FaEye, FaEyeSlash } from \"react-icons\/fa\";/" src/pages/MangaDetails/components/ReviewsSection/ReviewHeader.jsx

# ── Remove Persian comment from AppRouter.jsx ──
sed -i "s/import AISearch from \"..\/pages\/AISearch\/AISearch\"; \/\/ وارد کردن صفحه جدید/import AISearch from \"..\/pages\/AISearch\/AISearch\";/" src/router/AppRouter.jsx

# ── Remove inline <style> from HeroBanner.jsx (the whole <style> block) ──
# We'll delete lines containing <style> and up to </style>
sed -i '/^            <style>/,/^            <\/style>/d' src/pages/Home/components/Hero/HeroBanner.jsx

echo "✅ All fixes applied successfully."