import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import defaultPic from "../assets/pics/default.png";

export default function HeroBanner({ mangas }) {

    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!mangas.length) return;
        mangas = mangas.slice(0, 5)

        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === mangas.length - 1
                    ? 0
                    : prev + 1
            );
        }, 8000);

        return () => clearInterval(interval);
    }, [mangas]);

    if (!mangas.length) return null;

    return (
        <div
            className="
                relative
                w-full
                h-[450px] md:h-[500px] xl:h-[550px]
                rounded-[2rem]
                overflow-hidden
                shadow-2xl shadow-purple-900/20
                border border-white/5
                bg-[#0f0f11]
                group
            "
        >
            <style>{`
                @keyframes banner-progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-banner-progress {
                    animation: banner-progress 8s linear forwards;
                }
            `}</style>

            {/* Sliding container */}
            <div
                className="
                    flex h-full
                    transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                "
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {mangas.map((manga) => (
                    <div
                        key={manga.mal_id}
                        onClick={() =>
                            navigate(`/manga/${manga.mal_id}`)
                        }
                        className="
                            relative
                            min-w-full
                            h-full
                            cursor-pointer
                        "
                    >
                        {/* Blurred background with improved saturation and positioning */}
                        <img
                            src={
                                manga?.images?.jpg?.large_image_url
                                ?? defaultPic
                            }
                            alt={manga.title}
                            className="
                                absolute inset-0
                                w-full h-full
                                object-cover object-top
                                blur-3xl
                                scale-125
                                opacity-40
                                saturate-150
                                transition-transform duration-1000
                                group-hover:scale-[1.3]
                            "
                        />

                        {/* Dark overlay - Refined with rich gradients */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent z-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent z-0 opacity-80" />

                        {/* Content */}
                        <div className="
                            relative z-10
                            h-full
                            flex flex-col md:flex-row items-center
                            justify-start
                            gap-8 md:gap-12
                            px-8 md:px-16 lg:px-20
                            py-4
                        ">

                            {/* Clear cover image */}
                            <div className="relative flex-shrink-0 group/image hidden sm:block">
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                                <img
                                    src={
                                        manga?.images?.jpg?.large_image_url
                                        ?? defaultPic
                                    }
                                    alt={manga.title}
                                    className="
                                        relative
                                        w-48 h-72 md:w-64 md:h-96
                                        object-cover
                                        rounded-2xl
                                        shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                                        border border-white/10
                                        transition-all duration-500 ease-out
                                        group-hover/image:-translate-y-2
                                        group-hover/image:shadow-[0_30px_60px_rgba(168,85,247,0.3)]
                                    "
                                />
                            </div>

                            {/* Text content */}
                            <div className="
                                flex flex-col
                                justify-center
                                items-start
                                gap-4 md:gap-5
                                max-w-2xl
                                w-full
                            ">
                                {/* Title Wrapper */}
                                <div className="space-y-1">
                                    {/* Japanese title */}
                                    <p className="text-purple-400/80 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                                        {manga.title_japanese || "No Japanese title"}
                                    </p>
                                    
                                    {/* Title */}
                                    <h1 className="
                                        text-3xl md:text-5xl lg:text-6xl 
                                        font-extrabold 
                                        text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400
                                        drop-shadow-sm
                                        tracking-tight
                                        line-clamp-2
                                        z-12
                                    ">
                                        {manga.title}
                                    </h1>
                                </div>

                                {/* Stats */}
                                <div className="
                                    flex flex-wrap gap-3 md:gap-4
                                    text-sm font-medium text-white/90
                                ">
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                                        <span className="text-yellow-400 text-lg leading-none">★</span>
                                        {manga.score || "N/A"}
                                    </span>

                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                                        <span className="text-gray-400">Rank</span>
                                        <span className="text-purple-300 font-bold">#{manga.rank || "N/A"}</span>
                                    </span>

                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        {manga.status || "Unknown"}
                                    </span>
                                </div>

                                {/* Synopsis */}
                                <p className="
                                    text-gray-300/90
                                    text-sm md:text-base
                                    max-w-xl
                                    line-clamp-3 md:line-clamp-4
                                    leading-relaxed
                                    font-light
                                ">
                                    {manga?.synopsis
                                        ? manga.synopsis.slice(0, 200) + "..."
                                        : "No description available."}
                                </p>

                                {/* Genres */}
                                <div className="
                                    flex gap-2
                                    flex-wrap
                                    mt-2
                                ">
                                    {manga.genres
                                        ?.slice(0, 4)
                                        .map((genre) => (
                                            <span
                                                key={genre.mal_id}
                                                className="
                                                    px-4 py-1.5
                                                    rounded-full
                                                    bg-purple-500/10 hover:bg-purple-500/20
                                                    border border-purple-500/20
                                                    text-purple-200
                                                    text-xs md:text-sm font-medium
                                                    tracking-wide
                                                    transition-colors duration-300
                                                "
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/manga/${manga.mal_id}`);
                                    }}
                                    className="
                                        mt-4
                                        group/btn
                                        relative
                                        flex items-center justify-center gap-2
                                        w-full sm:w-fit
                                        px-8 py-3.5
                                        rounded-xl
                                        bg-white
                                        text-black
                                        font-bold uppercase tracking-wider text-sm
                                        shadow-[0_0_20px_rgba(255,255,255,0.2)]
                                        cursor-pointer
                                        transition-all duration-300 ease-out
                                        hover:bg-gray-100
                                        hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
                                        hover:-translate-y-1
                                        active:translate-y-0
                                    "
                                >
                                    <span>View Details</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="
                absolute bottom-0 left-0
                w-full h-1.5
                bg-white/5
                backdrop-blur-sm
                z-20
            ">
                <div
                    key={current}
                    className="
                        h-full
                        bg-gradient-to-r from-purple-600 to-purple-400
                        shadow-[0_0_10px_rgba(168,85,247,0.8)]
                        animate-banner-progress
                    "
                />
            </div>
        </div>
    );
}