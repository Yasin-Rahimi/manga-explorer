import { useNavigate } from "react-router";

export default function MangaCard({ manga }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/manga/${manga.id}`)}
            className="cursor-pointer bg-gray-900 rounded-xl p-4 hover:scale-105 transition-all"
        >
            {/* Manga cover */}
            <div className="h-40 bg-gray-700 rounded-lg mb-3" />

            {/* Title */}
            <h3 className="text-white font-semibold">
                {manga.title}
            </h3>

            {/* Rating */}
            <p className="text-purple-400 text-sm">
                ⭐ {manga.rating}
            </p>
        </div>
    );
}