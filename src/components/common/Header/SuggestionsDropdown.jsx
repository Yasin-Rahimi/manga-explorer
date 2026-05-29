export default function SuggestionsDropdown({
    suggestions,
    activeIndex,
    onSuggestionClick,
    onMouseEnter,
    isLoading = false
}) {

    if (isLoading) {
        return (
            <ul className="absolute left-0 right-0 top-full mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50 overflow-y-auto">
                {[1, 2, 3, 4].map((_, idx) => (
                    <li
                        key={idx}
                        className="px-4 py-2 flex items-center gap-2 animate-pulse"
                    >
                        <div className="w-8 h-8 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded flex-1"></div>
                    </li>
                ))}
            </ul>
        );
    }

    if (!suggestions.length) return null;

    return (
        <ul className="absolute left-0 right-0 top-full mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            
            {suggestions.map((manga, idx) => (
                
                <li
                    key={idx}
                    onClick={() => onSuggestionClick(manga)}
                    onMouseEnter={() => onMouseEnter(idx)}
                    className={`px-4 py-2 cursor-pointer text-white text-sm flex items-center gap-2 transition-colors ${
                        activeIndex === idx
                            ? "bg-purple-600/60"
                            : "hover:bg-purple-600/40"
                    }`}
                >

                    {!manga.isCustom && (
                        <img
                            src={manga.images?.jpg?.small_image_url || manga.images?.jpg?.image_url}
                            alt=""
                            className="w-8 h-8 object-cover rounded"
                        />
                    )}

                    {manga.isCustom && <div className="w-8 h-8"></div>}

                    <span>{manga.title}</span>

                </li>
            ))}
        </ul>

    );
}