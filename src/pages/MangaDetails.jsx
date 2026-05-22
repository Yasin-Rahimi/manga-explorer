import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMangaById } from "../lib/api";

export default function MangaDetails() {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getMangaById(id);
                setManga(data.data);
            } catch (error) {
                console.error("Failed to fetch manga data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                <p className="text-purple-300 font-medium tracking-wide animate-pulse">Loading manga details...</p>
            </div>
        );
    }

    if (!manga) {
        return (
            <div className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center justify-center gap-4">
                <p className="text-red-400 font-semibold text-lg">Manga details could not be found.</p>
                <BackButton />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09080e] text-gray-100 flex flex-col selection:bg-purple-600 selection:text-white overflow-hidden relative">
            
            {/* Ambient Background Glow Effect */}
            <div className="absolute top-0 left-0 right-0 h-125 opacity-20 pointer-events-none overflow-hidden">
                <img 
                    src={manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url} 
                    alt="" 
                    className="w-full h-full object-cover filter blur-[80px] scale-125 transform translate-y-[-20%]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#09080e]/70 to-[#09080e]"></div>
            </div>

            {/* Header */}
            <Header />

            {}
            <main className="grow relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

                {/* Main Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4">

                    {}
                    {/* Left Column: Poster / Cover Image */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                        <div className="relative group w-64 sm:w-72 lg:w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(147,51,234,0.3)]">
                            <img
                                src={manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url}
                                alt={manga.title}
                                className="w-full h-95 sm:h-112.5 object-cover"
                            />
                            {/* Gradient Overlay over image */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                            
                            {/* Quick status badge on image */}
                            <div className="absolute bottom-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                                {manga.status ?? 'Unknown'}
                            </div>
                        </div>
                    </div>

                    {}
                    {/* Right Column: Core Manga Details */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        
                        {/* Title block */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                                {manga.title ?? 'Untitled'}
                            </h1>
                            {manga.title_japanese && (
                                <p className="text-lg text-purple-400/90 font-medium mt-2 font-sans">
                                    {manga.title_japanese}
                                </p>
                            )}
                        </div>

                        {}
                        {/* Interactive Stats Panel */}
                        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
                            {/* Score Card */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center backdrop-blur-md transition hover:bg-white/10">
                                <span className="block text-amber-400 text-xl font-bold mb-1">⭐ {manga.score ?? 'N/A'}</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Score</span>
                            </div>
                            {/* Rank Card */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center backdrop-blur-md transition hover:bg-white/10">
                                <span className="block text-purple-400 text-xl font-bold mb-1">#{manga.rank ?? 'N/A'}</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Global Rank</span>
                            </div>
                            {/* Popularity Card */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center backdrop-blur-md transition hover:bg-white/10">
                                <span className="block text-pink-400 text-xl font-bold mb-1">#{manga.popularity ?? 'N/A'}</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Popularity</span>
                            </div>
                        </div>

                        {}
                        {/* Genres */}
                        {manga.genres && manga.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {manga.genres.map((g) => (
                                    <span
                                        key={g.mal_id}
                                        className="px-3 py-1.5 bg-purple-900/40 text-purple-300 border border-purple-700/30 rounded-full text-xs font-semibold tracking-wide transition hover:bg-purple-800 hover:text-white cursor-default"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {}
                        {/* Synopsis Card */}
                        <div className="bg-white/3 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold mb-3 text-white border-b border-purple-500/20 pb-2 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-purple-500 rounded-full inline-block"></span>
                                Synopsis
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line font-light">
                                {manga.synopsis ? manga.synopsis : 'No description has been written for this manga.'}
                            </p>
                        </div>

                        {}
                        {/* Detailed Meta Panel */}
                        <div className="bg-linear-to-br from-white/4 to-transparent border border-white/5 rounded-2xl p-6 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Chapters</span>
                                <span className="text-base font-bold text-white">{manga.chapters ?? 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Volumes</span>
                                <span className="text-base font-bold text-white">{manga.volumes ?? 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Published</span>
                                <span className="text-xs sm:text-sm font-bold text-white truncate" title={manga.published?.string}>
                                    {manga.published?.string ?? 'Unknown'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Author</span>
                                <span className="text-sm font-bold text-purple-300 truncate" title={manga.authors?.[0]?.name}>
                                    {manga.authors?.[0]?.name ?? 'Unknown'}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
}