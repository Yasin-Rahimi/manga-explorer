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
        }, 5000);

        return () => clearInterval(interval);
    }, [mangas]);

    if (!mangas.length) return null;

    const manga = mangas[current];

    return (
        <div
            onClick={() => navigate(`/manga/${manga.mal_id}`)}
            className="
                relative
                h-fit
                p-10
                m-5
                rounded-2xl
                overflow-hidden
                cursor-pointer
                group
            "
        >

            {/* Background */}
            <img
                src={manga?.images?.jpg?.large_image_url ?? defaultPic}
                alt={manga.title}
                className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                "
            />

            {/* Overlay */}
            <div className="
                absolute inset-0
                bg-linear-to-r
                from-black/90
                via-black/50
                to-transparent
            " />

            {/* Content */}
            <div className="
                relative z-10
                h-full
                flex flex-col
                justify-center
                max-w-2xl
                px-12
                gap-4
            ">

                <h1 className="text-5xl font-bold">
                    {manga.title}
                </h1>

                <p className="text-purple-300 text-lg">
                    {manga.title_japanese || "No Japanese title"}
                </p>

                <div className="flex gap-6 text-gray-300">
                    <span>⭐ {manga.score || "N/A"}</span>
                    <span>#{manga.rank || "N/A"}</span>
                    <span>{manga.status || "Unknown"}</span>
                </div>

                <p className="
                    text-gray-200
                    max-w-xl
                    line-clamp-4
                    leading-relaxed
                ">
                    {manga.synopsis.slice(0, 140) + '...' || "No description available."}
                </p>

                <div className="flex gap-2 flex-wrap">
                    {manga.genres?.slice(0, 4).map((genre) => (
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
    );
}