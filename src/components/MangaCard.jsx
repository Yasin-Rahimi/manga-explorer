import { useNavigate } from "react-router";
import defaultPic from "../assets/pics/default.png";

export default function MangaCard({ manga }) {

    const navigate = useNavigate();
    const imageUrl = manga?.images?.jpg?.image_url ?? defaultPic;

    return (
        <div
            onClick={() => navigate(`/manga/${manga.mal_id}`)}
            className="
                relative cursor-pointer
                rounded-xl overflow-hidden
                shadow-lg
                bg-gray-900
                transition-all duration-300
                hover:scale-[1.05]
                hover:shadow-purple-500/30
                group
            "
        >

            {/* Hover Background (hidden until hover) */}
            <div
                className="
                    absolute inset-0
                    bg-cover bg-center
                    opacity-0
                    group-hover:opacity-100
                    scale-110
                    blur-2xl
                    brightness-75
                    transition-all duration-500
                "
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />

            {/* Dark overlay only on hover */}
            <div className="
                absolute inset-0
                bg-black/0
                group-hover:bg-black/40
                transition-all duration-300
            " />

            {/* Content */}
            <div className="relative z-10 p-4 flex flex-col gap-3">

                {/* MAIN IMAGE (always clear) */}
                <img
                    src={imageUrl}
                    alt={manga.title}
                    className="
                        w-full h-52
                        object-cover
                        rounded-lg
                        shadow-xl
                        border border-white/10
                        group-hover:scale-[1.02]
                        transition-transform duration-300
                    "
                />

                {/* Title */}
                <h3 className="text-white font-bold text-lg truncate">
                    {manga.title ? manga.title : 'Unknown'}
                </h3>

                {/* Author */}
                <p className="text-gray-300 text-xs">
                    {manga?.authors?.[0]?.name
                        ? `By ${manga.authors[0].name}`
                        : "Author unknown"}
                </p>

                {/* Score */}
                <p className="text-purple-300 text-sm">
                    ⭐ {manga?.score ? manga.score : "Not rated"}
                </p>

                {/* Description */}
                <p className="text-gray-300 text-xs line-clamp-2 opacity-80">
                    {manga?.synopsis
                        ? manga.synopsis.slice(0, 90) + "..."
                        : "No description available"}
                </p>

            </div>
        </div>
    );
}