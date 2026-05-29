import SuggestionsDropdown from "./SuggestionsDropdown";

export default function SearchSuggestions({
    isDesktop,
    isMobileMenu,
    showSuggestions,
    suggestions,
    isLoadingSuggestions,
    activeIndex,
    onSuggestionClick,
    onMouseEnter
}) {

    if (!showSuggestions || suggestions.length === 0) return null;

    const dropdown = (
        <div className="absolute left-0 right-0 top-full mt-2 z-50">
            <SuggestionsDropdown
                suggestions={suggestions}
                activeIndex={activeIndex}
                onSuggestionClick={onSuggestionClick}
                onMouseEnter={onMouseEnter}
                isLoading={isLoadingSuggestions}
            />
        </div>
    );

    
    if (isDesktop) return dropdown;
    if (isMobileMenu) return dropdown;
    
    return null;
}
