import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MangaCard from "../components/MangaCard";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    // Mock trending data (no API yet)
    const trending = [
        { id: 1, title: "Naruto", rating: 9.1 },
        { id: 2, title: "One Piece", rating: 9.5 },
        { id: 3, title: "Attack on Titan", rating: 9.3 },
        { id: 4, title: "Demon Slayer", rating: 8.9 },
        { id: 5, title: "Jujutsu Kaisen", rating: 9.0 },
        { id: 6, title: "Death Note", rating: 9.2 },
        { id: 7, title: "Bleach", rating: 8.7 },
        { id: 8, title: "Chainsaw Man", rating: 8.8 }
    ];

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) return;

        navigate(`/search?q=${query}`);
    };

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
                        className="px-4 py-2 rounded-lg text-black w-80"
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
                    {trending.map((manga) => (
                        <MangaCard key={manga.id} manga={manga} />
                    ))}
                </div>

            </section>

            {/* Footer */}
            <Footer />

        </div>
    );
}