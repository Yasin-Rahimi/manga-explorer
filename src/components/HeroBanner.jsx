// HeroBanner.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import defaultPic from "../assets/pics/default.png";

export default function HeroBanner({ mangas }) {
    const navigate = useNavigate();

    const visibleMangas = mangas.slice(0, 5);

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === visibleMangas.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? visibleMangas.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!visibleMangas.length) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(interval);
    }, [visibleMangas.length]);

    if (!visibleMangas.length) return null;

    return (
        <div
            className="
                relative
                w-full
                h-112.5
                sm:h-87.5
                md:h-102.5
                lg:h-112.5
                xl:h-122.5
                2xl:h-132.5
                rounded-2xl
                sm:rounded-3xl
                xl:rounded-4xl
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

            {/* Slides */}
            <div
                className="
                    flex
                    h-full
                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.25,1,0.5,1)]
                "
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {visibleMangas.map((manga) => (
                    <div
                        key={manga.mal_id}
                        onClick={() =>
                            navigate(`/manga/${manga.mal_id}`)
                        }
                        className="
                            relative
                            min-w-full
                            h-full
                        "
                    >
                        {/* Background image */}
                        <img
                            src={
                                manga?.images?.jpg?.large_image_url
                                ?? defaultPic
                            }
                            alt={manga.title}
                            className="
                                absolute
                                inset-0
                                w-full
                                h-full
                                object-cover
                                object-center
                                md:object-top
                                scale-100
                                md:scale-125
                                blur-0
                                md:blur-3xl
                                opacity-100
                                md:opacity-40
                                saturate-125
                                md:saturate-150
                                transition-transform
                                duration-1000
                                group-hover:scale-105
                                md:group-hover:scale-[1.3]
                            "
                        />

                        {/* Mobile overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/65 to-transparent md:hidden z-0" />

                        {/* Desktop overlay */}
                        <div className="hidden md:block absolute inset-0 bg-linear-to-r from-[#0a0a0c] via-[#0a0a0c]/85 to-transparent z-0" />
                        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent z-0 opacity-80" />

                        {/* Content */}
                        <div
                            className="
                                relative
                                z-10
                                h-full
                                flex
                                flex-col
                                justify-end
                                md:justify-center
                                lg:justify-start
                                md:flex-row
                                items-start
                                md:items-center
                                gap-2
                                sm:gap-3
                                md:gap-8
                                lg:gap-10
                                xl:gap-12
                                px-4
                                sm:px-6
                                md:px-8
                                lg:px-12
                                xl:px-16
                                2xl:px-20
                                py-4
                                sm:py-5
                                md:py-8
                            "
                        >
                            {/* Cover image */}
                            <div className="relative shrink-0 hidden md:block group/image">
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>

                                <img
                                    src={
                                        manga?.images?.jpg?.large_image_url
                                        ?? defaultPic
                                    }
                                    alt={manga.title}
                                    className="
                                        relative
                                        md:w-44
                                        md:h-64
                                        lg:w-52
                                        lg:h-76
                                        xl:w-60
                                        xl:h-88
                                        2xl:w-64
                                        2xl:h-96
                                        object-cover
                                        rounded-xl
                                        sm:rounded-2xl
                                        shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                                        border
                                        border-white/10
                                        transition-all
                                        duration-500
                                        ease-out
                                        group-hover/image:-translate-y-2
                                        group-hover/image:shadow-[0_30px_60px_rgba(168,85,247,0.3)]
                                    "
                                />
                            </div>

                            {/* Text */}
                            <div
                                className="
                                    flex
                                    flex-col
                                    justify-end
                                    md:justify-center
                                    items-start
                                    gap-2
                                    sm:gap-1.5
                                    md:gap-2
                                    w-full
                                    max-w-full
                                    md:max-w-xl
                                    lg:max-w-2xl
                                "
                            >

                                {/* Title */}
                                <div className="space-y-0.5 sm:space-y-1 md:space-y-2">

                                    <h1
                                        className="
                                            text-xl
                                            sm:text-3xl
                                            md:text-4xl
                                            lg:text-5xl
                                            xl:text-6xl
                                            font-extrabold
                                            text-transparent
                                            bg-clip-text
                                            bg-linear-to-br
                                            from-white
                                            via-white
                                            to-gray-400
                                            tracking-tight
                                            leading-tight
                                            line-clamp-2
                                        "
                                    >
                                        {manga.title}
                                    </h1>
                                </div>

                                {/* Stats */}
                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-2
                                        sm:gap-2.5
                                        md:gap-4
                                        text-[11px]
                                        sm:text-sm
                                        font-medium
                                        text-white/90
                                    "
                                >
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                                        <span className="text-yellow-400 text-sm sm:text-lg">
                                            ★
                                        </span>
                                        {manga.score || "N/A"}
                                    </span>

                                    <span className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                                        <span className="text-gray-400">
                                            Rank
                                        </span>

                                        <span className="text-purple-300 font-bold">
                                            #{manga.rank || "N/A"}
                                        </span>
                                    </span>

                                    <span className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        {manga.status || "Unknown"}
                                    </span>
                                </div>

                                {/* Synopsis */}
                                <p
                                    className="
                                        text-gray-300/90
                                        text-xs
                                        sm:text-sm
                                        md:text-base
                                        leading-relaxed
                                        font-light
                                        line-clamp-3
                                        md:line-clamp-4
                                        max-w-full
                                        lg:max-w-xl
                                    "
                                >
                                    {manga?.synopsis
                                        ? manga.synopsis.slice(0, 120) + "..."
                                        : "No description available."}
                                </p>

                                {/* Genres */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                                    {manga.genres
                                        ?.slice(0, 4)
                                        .map((genre) => (
                                            <span
                                                key={genre.mal_id}
                                                className="
                                                    px-2.5
                                                    sm:px-4
                                                    py-1
                                                    sm:py-1.5
                                                    rounded-full
                                                    bg-purple-500/10
                                                    hover:bg-purple-500/20
                                                    border
                                                    border-purple-500/20
                                                    text-purple-200
                                                    text-[10px]
                                                    sm:text-xs
                                                    md:text-sm
                                                    font-medium
                                                    tracking-wide
                                                    transition-colors
                                                    duration-300
                                                "
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                </div>

                                {/* Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/manga/${manga.mal_id}`);
                                    }}
                                    className="
                                        mt-2
                                        sm:mt-3
                                        group/btn
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        w-full
                                        sm:w-fit
                                        px-5
                                        sm:px-8
                                        py-2.5
                                        sm:py-3.5
                                        rounded-xl
                                        bg-white
                                        text-black
                                        text-xs
                                        sm:text-sm
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        shadow-[0_0_20px_rgba(255,255,255,0.2)]
                                        cursor-pointer
                                        transition-all
                                        duration-300
                                        hover:bg-gray-100
                                        hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
                                        hover:-translate-y-1
                                    "
                                >
                                    <span>View Details</span>

                                    <svg
                                        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <div
                className="
                    absolute
                    top-1/2
                    left-0
                    w-full
                    -translate-y-1/2
                    z-30
                    flex
                    items-center
                    justify-between
                    px-3
                    sm:px-5
                    pointer-events-none
                "
            >
                {/* Prev */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                    }}
                    className="
                        pointer-events-auto
                        w-10
                        h-10
                        sm:w-12
                        sm:h-12
                        rounded-full
                        bg-black/40
                        hover:bg-black/60
                        backdrop-blur-xl
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        text-white
                        transition-all
                        duration-300
                        cursor-pointer
                        hover:scale-110
                    "
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* Next */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                    }}
                    className="
                        pointer-events-auto
                        w-10
                        h-10
                        sm:w-12
                        sm:h-12
                        rounded-full
                        bg-black/40
                        hover:bg-black/60
                        backdrop-blur-xl
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        text-white
                        transition-all
                        duration-300
                        cursor-pointer
                        hover:scale-110
                    "
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* Bottom indicators */}
            <div
                className="
                    absolute
                    bottom-5
                    left-1/2
                    -translate-x-1/2
                    z-30
                    flex
                    items-center
                    gap-2
                "
            >
                {visibleMangas.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrent(index);
                        }}
                        className={`
                            h-2 rounded-full transition-all duration-300
                            ${
                                current === index
                                    ? "w-8 bg-purple-400"
                                    : "w-2 bg-white/40 hover:bg-white/70"
                            }
                        `}
                    />
                ))}
            </div>

            {/* Progress */}
            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    h-1
                    sm:h-1.5
                    bg-white/5
                    backdrop-blur-sm
                    z-20
                "
            >
                <div
                    key={current}
                    className="
                        h-full
                        bg-linear-to-r
                        from-purple-600
                        to-purple-400
                        shadow-[0_0_10px_rgba(168,85,247,0.8)]
                        animate-banner-progress
                    "
                />
            </div>
        </div>
    );
}