    import { useState, useEffect } from 'react';
    import { useSearchParams } from "react-router";
    import { searchManga } from "../lib/api";
    import MangaCard from "../components/MangaCard";
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import BackButton from '../components/BackButton';


    export default function Search() {
        const [params] = useSearchParams();
        const [results, setResults] = useState([]);
        const [loading, setLoading] = useState(false)
        const query = params.get("q");

        useEffect(() => {
            if (!query) return;
        
            let ignore = false;
        
            const fetchResults = async () => {
                setLoading(true);
        
                try {
                    const data = await searchManga(query);
        
                    if (!ignore) {
                        setResults(data.data);
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

                {/* Search result title */}
                <div className="p-10">

                    <h1 className="text-2xl font-bold p-4">
                        Search Results for: {query}
                    </h1>

                    {/* Placeholder content */}
                    <div className="grid grid-cols-4 gap-6">
                        {results.map((manga, index) => (
                            <MangaCard key={index} manga={manga} />
                        ))}
                    </div>

                    
                    {loading && (
                        <p className="text-center text-gray-400 mb-4">
                            Loading...
                        </p>
                    )}

                </div>

                {/* Footer */}
                <Footer />

            </div>
        );
    }