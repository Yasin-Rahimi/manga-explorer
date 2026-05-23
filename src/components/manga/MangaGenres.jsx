export default function MangaGenres({ genres }) {
    if (!genres || genres.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {genres.map((g) => (
                <span
                    key={g.mal_id}
                    className="px-3 py-1.5 bg-purple-900/40 text-purple-300 border border-purple-700/30 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition hover:bg-purple-800 hover:text-white cursor-default wrap-break-word"
                >
                    {g.name}
                </span>
            ))}
        </div>
    );
}