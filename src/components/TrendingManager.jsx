import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import TrendingSection from "./TrendingSection";
import { getTopManga } from "../lib/api";

const ERROR_MESSAGE = "Failed to load trending manga.";

export default function TrendingManager() {
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getTopManga(page);
                setTrending(res.data ?? []);
                setLastPage(res.pagination?.last_visible_page ?? 1);
            } catch {
                setError(ERROR_MESSAGE);
                setTrending([]);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        fetchData();
    }, [page]);

    return (
        <>
            <HeroSection mangas={trending.slice(0, 5)} />

            <TrendingSection
                trending={trending.slice(5)}
                page={page}
                setPage={setPage}
                lastPage={lastPage}
                loading={loading}
                error={error}
            />
        </>
    );
}