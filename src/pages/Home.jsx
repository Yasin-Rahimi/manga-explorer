import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MangaCard from "../components/MangaCard";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import { getTopManga } from "../lib/api";
import HeroBanner from "../components/HeroBanner";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Empty from "../components/ui/Empty";

export default function Home() {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) return;

        navigate(`/search?q=${query}`);
    };

    // Fetch top manga on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const res = await getTopManga(page);
    
                setTrending(res.data ?? []);
                setLastPage(res.pagination?.last_visible_page ?? 1);
    
            } catch (err) {
                setError("Failed to load trending manga.");
                setTrending([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [page]);

    // Pagination
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
    
            const res = await getTopManga(page);
    
            setTrending(res.data);
            setLastPage(res.pagination.last_visible_page);
    
            setLoading(false);
    
            // Auto scroll to top after page change
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    
        fetchData();
    }, [page]);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">

            {/* Header */}
            <Header
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
            />

            <section className="px-10 py-10">
                <HeroBanner mangas={trending} />
            </section>

            {/* Trending Section */}
            <section className="px-10">
                
                {/* Section title */}
                {trending.lenght > 0 && <h2 className="text-2xl font-bold mb-6">
                    Top Trending Manga
                </h2>}

                {/* Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {trending || [].map((manga, index) => (
                        <MangaCard key={index} manga={manga} />
                    ))}
                </div>

                {/* Pagination */}
                {trending.lenght > 0 && <Pagination
                    page={page}
                    setPage={setPage}
                    lastPage={lastPage}
                />}

                {/* States */}
                {loading && <Loading text="Loading trending manga..." />}

                {error && (
                    <Error
                        message={error}
                        onRetry={() => setPage(1)}
                    />
                )}

                {!loading && !error && trending.length === 0 && (
                    <Empty message="No trending manga found." />
                )}

            </section>

            {/* Footer */}
            <Footer />

        </div>
    );
}