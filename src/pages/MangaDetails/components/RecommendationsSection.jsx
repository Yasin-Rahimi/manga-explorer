import { useNavigate } from "react-router";
import defaultPic from "../../../assets/pics/default.png";

export default function RecommendationsSection({ recommendations }) {
    const navigate = useNavigate();
    if (!recommendations || recommendations.length === 0) return null;

    // نمایش حداکثر ۶ پیشنهاد
    const displayed = recommendations.slice(0, 6);

    return (
        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 sm:p-6 backdrop-blur-md">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white mb-4">
                <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {displayed.map((entry) => {
                    const manga = entry.entry;
                    if (!manga) return null;
                    const imageUrl = manga.images?.jpg?.image_url ?? defaultPic;
                    return (
                        <div
                            key={manga.mal_id}
                            onClick={() => navigate(`/manga/${manga.mal_id}`)}
                            className="cursor-pointer group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                        >
                            <div className="aspect-3/4 overflow-hidden">
                                <img
                                    src={imageUrl}
                                    alt={manga.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-2">
                                <h3 className="text-xs font-semibold text-white line-clamp-2 leading-tight">
                                    {manga.title}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
