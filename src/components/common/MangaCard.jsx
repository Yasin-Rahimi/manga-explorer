import { useNavigate } from "react-router";
import defaultPic from "../../assets/pics/default.png";

export default function MangaCard({ manga }) {
  const navigate = useNavigate();
  const imageUrl = manga?.images?.jpg?.image_url ?? defaultPic;

  return (
    <div
      onClick={() => navigate(`/manga/${manga.mal_id}`)}
      className="
                relative
                w-full
                min-w-0
                cursor-pointer
                overflow-hidden
                rounded-xl sm:rounded-2xl
                bg-gray-900
                shadow-lg
                transition-all duration-300
                hover:scale-[1.02] sm:hover:scale-[1.04]
                hover:shadow-purple-500/30
                group
            "
    >
      {/* Hover Background */}
      <div
        className="
                    absolute inset-0
                    bg-cover bg-center
                    opacity-0
                    scale-110
                    blur-2xl
                    brightness-75
                    transition-all duration-500
                    group-hover:opacity-100
                "
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      {/* Dark overlay */}
      <div
        className="
                    absolute inset-0
                    bg-black/0
                    transition-all duration-300
                    group-hover:bg-black/40
                "
      />

      {/* Content */}
      <div
        className="
                    relative z-10
                    flex flex-col
                    gap-3 sm:gap-4
                    p-3 sm:p-4
                    h-full
                "
      >
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
          <img
            src={imageUrl}
            alt={manga.title}
            className="
                            w-full
                            h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64
                            object-cover
                            rounded-lg sm:rounded-xl
                            border border-white/10
                            shadow-xl
                            transition-transform duration-300
                            group-hover:scale-[1.02]
                        "
          />

          {/* Hover CTA */}
          <div
            className="
                            absolute top-2 right-2
                            sm:top-3 sm:right-3
                            opacity-0
                            translate-y-1.5
                            transition-all duration-300
                            group-hover:translate-y-0
                            group-hover:opacity-100
                        "
          >
            <div
              className="
                                px-2.5 sm:px-3
                                py-1 sm:py-1.5
                                rounded-full
                                border border-purple-400/30
                                bg-purple-600/90
                                backdrop-blur-md
                                text-[10px] sm:text-xs
                                font-semibold
                                text-white
                                shadow-lg
                                whitespace-nowrap
                            "
            >
              Read More →
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          className="
                        text-base sm:text-lg md:text-xl
                        font-bold
                        text-white
                        leading-snug
                        line-clamp-2
                        wrap-break-word
                        min-h-12 sm:min-h-14
                    "
        >
          {manga.title ? manga.title : "Unknown"}
        </h3>

        {/* Author */}
        <p
          className="
                        text-[11px] sm:text-xs md:text-sm
                        text-gray-300
                        line-clamp-1
                        wrap-break-word
                    "
        >
          {manga?.authors?.[0]?.name
            ? `By ${manga.authors[0].name}`
            : "Author unknown"}
        </p>

        {/* Score */}
        <p
          className="
                        text-sm sm:text-base
                        text-purple-300
                        font-medium
                    "
        >
          ⭐ {manga?.score ? manga.score : "Not rated"}
        </p>

        {/* Description */}
        <p
          className="
                        text-[11px] sm:text-xs md:text-sm
                        leading-relaxed
                        text-gray-300
                        opacity-80
                        line-clamp-2 sm:line-clamp-3
                        wrap-break-word
                    "
        >
          {manga?.synopsis
            ? manga.synopsis.slice(0, 60) + "..."
            : "There is no description available for this manga in our database."}
        </p>
      </div>
    </div>
  );
}
