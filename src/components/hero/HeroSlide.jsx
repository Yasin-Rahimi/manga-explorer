import { useNavigate } from "react-router";
import defaultPic from "../../assets/pics/default.png";

export default function HeroSlide({ manga }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/manga/${manga.mal_id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="relative min-w-full h-full cursor-pointer"
        >
            <img
                src={manga?.images?.jpg?.large_image_url ?? defaultPic}
                alt={manga.title}
                className="absolute inset-0 w-full h-full object-cover object-center md:object-top scale-100 md:scale-125 blur-0 md:blur-3xl opacity-100 md:opacity-40 saturate-125 md:saturate-150 transition-transform duration-1000 group-hover:scale-105 md:group-hover:scale-[1.3]"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/65 to-transparent md:hidden z-0" />
            <div className="hidden md:block absolute inset-0 bg-linear-to-r from-[#0a0a0c] via-[#0a0a0c]/85 to-transparent z-0" />
            <div className="hidden md:block absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent z-0 opacity-80" />

            <div className="relative z-10 h-full flex flex-col justify-end md:justify-center lg:justify-start md:flex-row items-start md:items-center gap-2 sm:gap-3 md:gap-8 lg:gap-10 xl:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-5 md:py-8">
                <div className="relative shrink-0 hidden md:block group/image">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                    <img
                        src={manga?.images?.jpg?.large_image_url ?? defaultPic}
                        alt={manga.title}
                        className="relative md:w-44 md:h-64 lg:w-52 lg:h-76 xl:w-60 xl:h-88 2xl:w-64 2xl:h-96 object-cover rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 ease-out group-hover/image:-translate-y-2 group-hover/image:shadow-[0_30px_60px_rgba(168,85,247,0.3)]"
                    />
                </div>

                <div className="flex flex-col justify-end md:justify-center items-start gap-2 sm:gap-1.5 md:gap-2 w-full max-w-full md:max-w-xl lg:max-w-2xl">
                    <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
                        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-white via-white to-gray-400 tracking-tight leading-tight line-clamp-2">
                            {manga.title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-4 text-[11px] sm:text-sm font-medium text-white/90">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                            <span className="text-yellow-400 text-sm sm:text-lg">★</span>
                            {manga.score || "N/A"}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                            <span className="text-gray-400">Rank</span>
                            <span className="text-purple-300 font-bold">#{manga.rank || "N/A"}</span>
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            {manga.status || "Unknown"}
                        </span>
                    </div>

                    <p className="text-gray-300/90 text-xs sm:text-sm md:text-base leading-relaxed font-light line-clamp-3 md:line-clamp-4 max-w-full lg:max-w-xl">
                        {manga?.synopsis ? manga.synopsis.slice(0, 120) + "..." : "No description available."}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                        {manga.genres?.slice(0, 4).map((genre) => (
                            <span
                                key={genre.mal_id}
                                className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-200 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-colors duration-300"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/manga/${manga.mal_id}`);
                        }}
                        className="mt-2 sm:mt-3 group/btn flex items-center justify-center gap-2 w-full sm:w-fit px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                    >
                        <span>View Details</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}