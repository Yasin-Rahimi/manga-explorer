
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { searchManga } from "../lib/api";
import MangaCard from "../components/MangaCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Empty from "../components/ui/Empty";

export default function Search() {
    const [params] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const query = params.get("q") || "";

    useEffect(() => {
        if (!query) return;

        let ignore = false;

        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await searchManga(query);

                if (!ignore) {
                    setResults(data?.data ?? []);
                }
            } catch (err) {
                if (!ignore) {
                    setError("Failed to search manga.");
                    setResults([]);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchResults();

        return () => {
            ignore = true;
        };
    }, [query]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <Header />

            {/* Content */}
            <main
                className="
                    flex-1
                    w-full
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    md:px-8
                    lg:px-10
                    xl:px-12
                    py-6
                    sm:py-8
                    md:py-10
                "
            >
                {/* Search title */}
                {query && !loading && (
                    <div className="mb-6 sm:mb-8">
                        <h1
                            className="
                                text-xl
                                sm:text-2xl
                                md:text-3xl
                                font-bold
                                tracking-tight
                                wrap-break-word
                            "
                        >
                            Search results for:
                            <span className="text-purple-400 ml-2">
                                "{query}"
                            </span>
                        </h1>
                    </div>
                )}

                {/* Results grid */}
                {!loading && !error && results.length > 0 && (
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-4
                            sm:gap-5
                            md:gap-6
                        "
                    >
                        {results.map((manga, index) => (
                            <MangaCard
                                key={index}
                                manga={manga}
                            />
                        ))}
                    </div>
                )}

                {/* States */}
                {loading && (
                    <div className="py-16 sm:py-20">
                        <Loading text="Searching..." />
                    </div>
                )}

                {error && (
                    <div className="py-16 sm:py-20">
                        <Error message={error} />
                    </div>
                )}

                {!loading && !error && results.length === 0 && (
                    <div className="py-16 sm:py-20">
                        <Empty message="No manga found for this search." />
                    </div>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}