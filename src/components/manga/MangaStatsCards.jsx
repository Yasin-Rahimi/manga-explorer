export default function MangaStatsCards({ score, rank, popularity }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-full sm:max-w-2xl mx-auto lg:mx-0">
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md transition hover:bg-white/10">
                <span className="block text-lg sm:text-xl text-amber-400 font-bold mb-1">⭐ {score ?? "N/A"}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Score</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md transition hover:bg-white/10">
                <span className="block text-lg sm:text-xl text-purple-400 font-bold mb-1">#{rank ?? "N/A"}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Global Rank</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md transition hover:bg-white/10">
                <span className="block text-lg sm:text-xl text-pink-400 font-bold mb-1">#{popularity ?? "N/A"}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Popularity</span>
            </div>
        </div>
    );
}