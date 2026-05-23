import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrendingManager from "../components/TrendingManager";
import { getTopManga } from "../lib/api";

const ERROR_MESSAGE = "Failed to load trending manga.";

export async function homeLoader({ request }) {
    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);

    try {
        const res = await getTopManga(page);

        return {
            trending: res.data ?? [],
            lastPage: res.pagination?.last_visible_page ?? 1,
            page,
            error: null
        };
    } catch {
        return {
            trending: [],
            lastPage: 1,
            page,
            error: ERROR_MESSAGE
        };
    }
}

export default function Home() {
    const { trending, lastPage, page, error } = useLoaderData();
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmitClicked(true);

        if (!query.trim()) {
            setIsEmpty(true);
            return;
        }

        setIsEmpty(false);
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">
            <Header
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                isEmpty={isEmpty}
                submitClicked={submitClicked}
            />
            <TrendingManager
                trending={trending}
                page={page}
                lastPage={lastPage}
                error={error}
            />
            <Footer />
        </div>
    );
}