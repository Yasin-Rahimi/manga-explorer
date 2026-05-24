export default function SuggestionsDropdown({ suggestions, onSuggestionClick }) {
    if (!suggestions.length) return null;

    return (
        <ul className="absolute left-0 right-0 top-full mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((manga) => (
                <li
                    key={manga.mal_id}
                    onClick={() => onSuggestionClick(manga)}
                    className="px-4 py-2 hover:bg-purple-600/40 cursor-pointer text-white text-sm flex items-center gap-2"
                >
                    <img
                        src={manga.images?.jpg?.small_image_url || manga.images?.jpg?.image_url}
                        alt=""
                        className="w-8 h-8 object-cover rounded"
                    />
                    <span>{manga.title}</span>
                </li>
            ))}
        </ul>
    );
}