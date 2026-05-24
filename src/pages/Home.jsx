import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TrendingSection from "../components/TrendingSection";
import { getTopManga } from "../lib/api";

const ERROR_MESSAGE = "Failed to load trending manga.";

export default function Home() {
    const navigate = useNavigate();

    // State for search (props to Header)
    const [query, setQuery] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);

    // State for trending data & pagination (client-side, no URL change)
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch trending when page changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getTopManga(page);
                setTrending(res.data ?? []);
                setLastPage(res.pagination?.last_visible_page ?? 1);
            } catch (err) {
                setError(ERROR_MESSAGE);
                setTrending([]);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        fetchData();
    }, [page]);

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

    const heroMangas = trending.slice(0, 5);
    const trendingMangas = trending.slice(5);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">
            <Header
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                isEmpty={isEmpty}
                submitClicked={submitClicked}
            />
            <HeroSection mangas={heroMangas} />
            <TrendingSection
                trending={trendingMangas}
                page={page}
                setPage={setPage}
                lastPage={lastPage}
                loading={loading}
                error={error}
            />
            <Footer />
        </div>
    );
}