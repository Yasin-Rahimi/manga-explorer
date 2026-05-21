import { useNavigate } from "react-router";
import defaultPic from '../assets/pics/default.png'

export default function MangaCard({ manga }) {
    const navigate = useNavigate();    

    return (
        <div
            onClick={() => navigate(`/manga/${manga.mal_id}`)}
            className="cursor-pointer bg-gray-900 rounded-xl p-4 hover:scale-105 transition-all "
        >
            {/* Manga cover */}
            <div
                className="h-40 rounded-lg mb-3 bg-cover bg-center"
                style={{ backgroundImage: `url(${manga?.images.jpg.image_url ?? defaultPic})` }}
            />

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