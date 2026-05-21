import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MangaCard from "../components/MangaCard";
import { useState, useEffect } from "react";
import { getTopManga } from "../lib/api";

export default function Home() {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [trending, setTrending] = useState([]);

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) return;

        navigate(`/search?q=${query}`);
    };

    // Fetch top manga on mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopManga();
            setTrending(data.data)
        };
    
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">

            {/* Header */}
            <Header />

            {/* Hero Search Section */}
            <section className="flex flex-col items-center justify-center py-20">
                
                {/* Title */}
                <h1 className="text-4xl font-bold mb-6">
                    Discover Manga
                </h1>

                {/* Search form */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-2"
                >
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for manga..."
                        className="px-4 py-2 rounded-lg text-black w-80 bg-amber-50"
                    />

                    <button className="bg-purple-600 px-4 py-2 rounded-lg">
                        Search
                    </button>
                </form>

            </section>

            {/* Trending Section */}
            <section className="px-10">
                
                {/* Section title */}
                <h2 className="text-2xl font-bold mb-6">
                    Top Trending Manga
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {trending.map((manga, index) => (
                        <MangaCard key={index} manga={manga} />
                    ))}
                </div>

            </section>

            {/* Footer */}
            <Footer />

        </div>
    );
}