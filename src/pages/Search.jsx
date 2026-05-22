import { useState, useEffect } from 'react';
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
    const query = params.get("q") || '';

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
                    setError("❌ Failed to search manga.");
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
            <div className="p-10 text-left">

                <div className="grid grid-cols-4 gap-6">
                    {results.map((manga, index) => (
                        <MangaCard key={index} manga={manga} />
                    ))}
                </div>

                {/* states */}
                {loading && <Loading text="Searching..." />}

                {error && <Error message={error} />}

                {!loading && !error && results.length === 0 && (
                    <Empty message="No manga found for this search." />
                )}

            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}