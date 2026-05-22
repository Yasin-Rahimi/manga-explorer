import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMangaById } from "../lib/api";
import BackButton from "../components/BackButton";

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
            <div
                className="
                    min-h-screen
                    bg-[#0b0a12]
                    text-white
                    flex flex-col
                    items-center justify-center
                    gap-4
                    px-4
                    text-center
                "
            >
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>

                <p className="text-sm sm:text-base text-purple-300 font-medium tracking-wide animate-pulse">
                    Loading manga details...
                </p>
            </div>
        );
    }

    if (!manga) {
        return (
            <div
                className="
                    min-h-screen
                    bg-[#0b0a12]
                    text-white
                    flex flex-col
                    items-center justify-center
                    gap-4
                    px-4
                    text-center
                "
            >
                <p className="text-base sm:text-lg text-red-400 font-semibold">
                    Manga details could not be found.
                </p>

                <BackButton />
            </div>
        );
    }

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#09080e]
                text-gray-100
                flex flex-col
                selection:bg-purple-600
                selection:text-white
            "
        >
            {/* Ambient Background Glow Effect */}
            <div className="absolute top-0 left-0 right-0 h-87.5 sm:h-105 md:h-125 lg:h-140 opacity-20 pointer-events-none overflow-hidden">
                <img
                    src={
                        manga.images?.jpg?.large_image_url ||
                        manga.images?.jpg?.image_url
                    }
                    alt=""
                    className="
                        w-full h-full
                        object-cover
                        blur-[60px] sm:blur-[80px]
                        scale-125
                        translate-y-[-20%]
                    "
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#09080e]/70 to-[#09080e]"></div>
            </div>

            {/* Header */}
            <Header />

            {/* Main */}
            <main
                className="
                    relative z-10
                    grow
                    w-full
                    max-w-7xl
                    mx-auto
                    px-4 sm:px-6 lg:px-8
                    py-6 sm:py-8 lg:py-10
                "
            >
                {/* Main Grid */}
                <div
                    className="
                        mt-2 sm:mt-4
                        grid grid-cols-1
                        lg:grid-cols-12
                        gap-8 lg:gap-12
                        items-start
                    "
                >

                    {/* Left Column */}
                    <div
                        className="
                            lg:col-span-4
                            flex flex-col
                            items-center lg:items-start
                        "
                    >
                        <div
                            className="
                                relative group
                                w-full
                                max-w-65
                                sm:max-w-[320px]
                                lg:max-w-full
                                rounded-2xl
                                overflow-hidden
                                border border-white/10
                                shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                                transition-all duration-500
                                hover:scale-[1.02]
                                hover:shadow-[0_20px_50px_rgba(147,51,234,0.3)]
                            "
                        >
                            <img
                                src={
                                    manga.images?.jpg?.large_image_url ||
                                    manga.images?.jpg?.image_url
                                }
                                alt={manga.title}
                                className="
                                    w-full
                                    h-95
                                    sm:h-112.5
                                    md:h-130
                                    lg:h-155
                                    object-cover
                                "
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40"></div>

                            {/* Status */}
                            <div
                                className="
                                    absolute bottom-3 left-3
                                    sm:bottom-4 sm:left-4
                                    bg-purple-600
                                    text-white
                                    text-[10px] sm:text-xs
                                    font-bold
                                    px-2.5 sm:px-3
                                    py-1
                                    rounded-md
                                    shadow-lg
                                    max-w-[80%]
                                    truncate
                                "
                            >
                                {manga.status ?? "Unknown"}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div
                        className="
                            lg:col-span-8
                            flex flex-col
                            gap-5 sm:gap-6
                            min-w-0
                        "
                    >
                        {/* Title */}
                        <div className="text-center lg:text-left min-w-0">
                            <h1
                                className="
                                    text-2xl
                                    sm:text-4xl
                                    lg:text-5xl
                                    xl:text-6xl
                                    font-black
                                    tracking-tight
                                    text-white
                                    leading-tight
                                    drop-shadow-md
                                    wrap-break-word
                                "
                            >
                                {manga.title ?? "Untitled"}
                            </h1>

                            {manga.title_japanese && (
                                <p
                                    className="
                                        mt-2
                                        text-sm sm:text-lg
                                        text-purple-400/90
                                        font-medium
                                        font-sans
                                        wrap-break-word
                                    "
                                >
                                    {manga.title_japanese}
                                </p>
                            )}
                        </div>

                        {/* Stats */}
                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-3
                                gap-3
                                w-full
                                max-w-full
                                sm:max-w-2xl
                                mx-auto lg:mx-0
                            "
                        >
                            {/* Score */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md transition hover:bg-white/10">
                                <span className="block text-lg sm:text-xl text-amber-400 font-bold mb-1">
                                    ⭐ {manga.score ?? "N/A"}
                                </span>

                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                    Score
                                </span>
                            </div>

                            {/* Rank */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md transition hover:bg-white/10">
                                <span className="block text-lg sm:text-xl text-purple-400 font-bold mb-1">
                                    #{manga.rank ?? "N/A"}
                                </span>

                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                    Global Rank
                                </span>
                            </div>

                            {/* Popularity */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md transition hover:bg-white/10">
                                <span className="block text-lg sm:text-xl text-pink-400 font-bold mb-1">
                                    #{manga.popularity ?? "N/A"}
                                </span>

                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                    Popularity
                                </span>
                            </div>
                        </div>

                        {/* Genres */}
                        {manga.genres && manga.genres.length > 0 && (
                            <div
                                className="
                                    flex flex-wrap
                                    gap-2
                                    justify-center lg:justify-start
                                "
                            >
                                {manga.genres.map((g) => (
                                    <span
                                        key={g.mal_id}
                                        className="
                                            px-3
                                            py-1.5
                                            bg-purple-900/40
                                            text-purple-300
                                            border border-purple-700/30
                                            rounded-full
                                            text-[11px] sm:text-xs
                                            font-semibold
                                            tracking-wide
                                            transition
                                            hover:bg-purple-800
                                            hover:text-white
                                            cursor-default
                                            wrap-break-word
                                        "
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Meta Panel */}
                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                xl:grid-cols-4
                                gap-4 sm:gap-6
                                rounded-2xl
                                border border-white/5
                                bg-linear-to-br from-white/4 to-transparent
                                p-4 sm:p-6
                                backdrop-blur-md
                            "
                        >
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Chapters
                                </span>

                                <span className="text-sm sm:text-base font-bold text-white wrap-break-word">
                                    {manga.chapters ?? "Unknown"}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Volumes
                                </span>

                                <span className="text-sm sm:text-base font-bold text-white wrap-break-word">
                                    {manga.volumes ?? "Unknown"}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Published
                                </span>

                                <span
                                    className="
                                        text-xs sm:text-sm
                                        font-bold
                                        text-white
                                        wrap-break-word
                                    "
                                    title={manga.published?.string}
                                >
                                    {manga.published?.string ?? "Unknown"}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Author
                                </span>

                                <span
                                    className="
                                        text-sm
                                        font-bold
                                        text-purple-300
                                        wrap-break-word
                                    "
                                    title={manga.authors?.[0]?.name}
                                >
                                    {manga.authors?.[0]?.name ?? "Unknown"}
                                </span>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div
                            className="
                                rounded-2xl
                                border border-white/5
                                bg-white/3
                                p-4 sm:p-6
                                backdrop-blur-md
                            "
                        >
                            <h2
                                className="
                                    flex items-center gap-2
                                    border-b border-purple-500/20
                                    pb-2
                                    mb-3
                                    text-lg sm:text-xl
                                    font-bold
                                    text-white
                                "
                            >
                                <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>

                                Synopsis
                            </h2>

                            <p
                                className="
                                    whitespace-pre-line
                                    text-sm sm:text-base
                                    leading-relaxed
                                    font-light
                                    text-gray-300
                                    wrap-break-word
                                "
                            >
                                {manga.synopsis
                                    ? manga.synopsis
                                    : "No description has been written for this manga."}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}