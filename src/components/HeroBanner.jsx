import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import defaultPic from "../assets/pics/default.png";

export default function HeroBanner({ mangas }) {
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!mangas.length) return;

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
                h-105
                rounded-2xl
                overflow-hidden
            "
        >
            {/* Sliding container */}
            <div
                className="
                    flex h-full
                    transition-transform duration-700 ease-in-out
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
                            group
                        "
                    >
                        {/* Blurred background */}
                        <img
                            src={
                                manga?.images?.jpg?.large_image_url
                                ?? defaultPic
                            }
                            alt={manga.title}
                            className="
                                absolute inset-0
                                w-full h-full
                                object-cover
                                blur-xl
                                scale-110
                                opacity-40
                                group-hover:scale-115
                                transition-transform duration-700
                            "
                        />

                        {/* Dark overlay */}
                        <div className="
                            absolute inset-0
                            bg-black/70
                        " />

                        {/* Content */}
                        <div className="
                            relative z-10
                            h-full
                            flex items-center
                            gap-10
                            px-12
                        ">

                            {/* Clear cover image */}
                            <img
                                src={
                                    manga?.images?.jpg?.large_image_url
                                    ?? defaultPic
                                }
                                alt={manga.title}
                                className="
                                    w-64 h-96
                                    object-cover
                                    rounded-xl
                                    shadow-2xl
                                    border border-white/10
                                    group-hover:scale-105
                                    transition-transform duration-500
                                    shrink-0
                                "
                            />

                            {/* Text content */}
                            <div className="
                                flex flex-col
                                justify-center
                                gap-4
                                max-w-2xl
                            ">
                                {/* Title */}
                                <h1 className="text-5xl font-bold">
                                    {manga.title}
                                </h1>

                                {/* Japanese title */}
                                <p className="text-purple-300 text-lg">
                                    {manga.title_japanese
                                        || "No Japanese title"}
                                </p>

                                {/* Stats */}
                                <div className="
                                    flex gap-6
                                    text-gray-300
                                ">
                                    <span>
                                        ⭐ {manga.score || "N/A"}
                                    </span>

                                    <span>
                                        #{manga.rank || "N/A"}
                                    </span>

                                    <span>
                                        {manga.status || "Unknown"}
                                    </span>
                                </div>

                                {/* Synopsis */}
                                <p className="
                                    text-gray-200
                                    max-w-xl
                                    line-clamp-4
                                    leading-relaxed
                                ">
                                    {manga?.synopsis
                                        ? manga.synopsis.slice(0, 140) + "..."
                                        : "No description available."}
                                </p>

                                {/* Genres */}
                                <div className="
                                    flex gap-2
                                    flex-wrap
                                ">
                                    {manga.genres
                                        ?.slice(0, 4)
                                        .map((genre) => (
                                            <span
                                                key={genre.mal_id}
                                                className="
                                                    px-3 py-1
                                                    rounded-full
                                                    bg-purple-700/70
                                                    text-sm
                                                "
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="
                absolute bottom-0 left-0
                w-full h-1
                bg-white/10
            ">
                <div
                    key={current}
                    className="
                        h-full
                        bg-purple-500
                        animate-banner-progress
                    "
                />
            </div>
        </div>
    );
}