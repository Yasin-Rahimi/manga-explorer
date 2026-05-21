import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router";
import { searchManga } from "../lib/api";
import MangaCard from "../components/MangaCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Search() {
    const [params] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const query = params.get("q");

    useEffect(() => {
        if (!query) return;

        let ignore = false;

        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await searchManga(query);

                if (!ignore) {
                    setResults(data.data || []);
                }
            } catch (err) {
                if (!ignore) {
                    setError("❌ Failed to fetch search results!");
                    setResults([]);
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchResults();

        return () => {
            ignore = true;
        };
    }, [query]);

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Header */}
            <Header />

            {/* Content */}
            <div className="p-10 text-center">

                {error && (
                    <p className="text-red-400 mb-4 font-bold text-2xl">
                        {error}
                    </p>
                )}

                {loading && (
                    <p className="text-center text-gray-400 mb-4">
                        Loading...
                    </p>
                )}

                {!loading && !error && results.length === 0 && (
                    <p className="text-red-400 mb-4 font-bold text-2xl">
                        ❌ No manga found!
                    </p>
                )}

                <div className="grid grid-cols-4 gap-6">
                    {results.map((manga, index) => (
                        <MangaCard key={index} manga={manga} />
                    ))}
                </div>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}