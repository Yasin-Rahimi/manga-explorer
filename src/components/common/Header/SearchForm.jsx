import { useState, useRef, useEffect, useCallback } from "react";
import { Form, useNavigation } from "react-router";
import { FaSearch } from "react-icons/fa";
import { searchManga } from "../../../lib/api";
import { askAi } from "../../../lib/ai/askAi";
import SuggestionsDropdown from "./SuggestionsDropdown";
import SearchModeSelector from "./SearchModeSelector";
import SearchTypeDropdown from "./SearchTypeDropdown";

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = (e) => setMatches(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query, matches]);
    return matches;
}

export default function SearchForm({ isMobileMenu = false, onSearchComplete, isTextModeActive, onTextMode }) {
    const navigation = useNavigation();
    const [isQueryEmpty, setIsQueryEmpty] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [searchType, setSearchType] = useState("normal");
    const [isAiLoading, setIsAiLoading] = useState(false);
    const abortControllerRef = useRef(null);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const isLoading = navigation.state === "submitting";
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const fetchSuggestions = useCallback(async (query) => {
        if (!isDesktop || searchType !== "normal") {
            setSuggestions([]);
            return;
        }
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoadingSuggestions(true);
        try {
            const data = await searchManga(query, { signal: controller.signal });
            const sorted = (data?.data ?? [])
                .slice()
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
            const results = sorted.slice(0, 4);
            setSuggestions(results);
            setActiveIndex(-1);
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error("Failed to fetch suggestions", err);
                setSuggestions([]);
            }
        } finally {
            setIsLoadingSuggestions(false);
        }
    }, [isDesktop, searchType]);

    const debouncedFetch = useCallback(debounce(fetchSuggestions, 200), [fetchSuggestions]);

    useEffect(() => {
        if (!isDesktop || searchType !== "normal") {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        if (inputValue.trim()) {
            debouncedFetch(inputValue);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setIsLoadingSuggestions(false);
        }
    }, [inputValue, debouncedFetch, isDesktop, searchType]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setActiveIndex(-1);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!showSuggestions || suggestions.length === 0) return;
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) => (prev + 1) % suggestions.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                const selected = suggestions[activeIndex];
                if (selected) {
                    setInputValue(selected.title);
                    setShowSuggestions(false);
                    if (isMobileMenu && onSearchComplete) onSearchComplete();
                    window.location.href = `/search?q=${encodeURIComponent(selected.title)}`;
                }
            } else if (e.key === "Escape") {
                setShowSuggestions(false);
                setActiveIndex(-1);
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [showSuggestions, suggestions, activeIndex, isMobileMenu, onSearchComplete]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsQueryEmpty(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.title);
        setShowSuggestions(false);
        if (isMobileMenu && onSearchComplete) onSearchComplete();
        window.location.href = `/search?q=${encodeURIComponent(suggestion.title)}`;
    };

    const performNormalSearch = () => {
        if (!inputValue.trim()) {
            setIsQueryEmpty(true);
            return;
        }
        if (isMobileMenu && onSearchComplete) onSearchComplete();
        window.location.href = `/search?q=${encodeURIComponent(inputValue.trim())}`;
    };

    const performAISearch = async () => {
        if (!inputValue.trim()) {
            setIsQueryEmpty(true);
            return;
        }
        setIsAiLoading(true);
        try {
            const prompt = `Extract the most likely manga name from this user query. Return only the manga name, no extra text. Query: "${inputValue.trim()}"`;
            const aiResult = await askAi(prompt, { temperature: 0.2, max_tokens: 50 });
            const mangaTitle = aiResult.trim();
            if (isMobileMenu && onSearchComplete) onSearchComplete();
            window.location.href = `/search?q=${encodeURIComponent(mangaTitle)}`;
        } catch (err) {
            console.error("AI search failed:", err);
            alert("AI search failed. Please try again.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const performSearch = (type) => {
        if (type === "normal") {
            performNormalSearch();
        } else if (type === "ai") {
            performAISearch();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setIsQueryEmpty(true);
            return;
        }
        if (isMobileMenu && onSearchComplete) onSearchComplete();
        performSearch(searchType);
    };

    useEffect(() => {
        const handleSlash = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current && !isMobileMenu && isTextModeActive) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleSlash);
        return () => document.removeEventListener('keydown', handleSlash);
    }, [isMobileMenu, isTextModeActive]);

    if (!isTextModeActive) return null;

    return (
        <div className={`relative ${isMobileMenu ? 'w-full' : 'w-full sm:w-auto'}`} ref={wrapperRef}>
            <Form method="get" action="/search" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2" onSubmit={handleSubmit}>
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none" />
                    <input
                        ref={inputRef}
                        name="q"
                        type="text"
                        autoComplete="new-password"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => {
                            if (isDesktop && inputValue.trim() && searchType === "normal") setShowSuggestions(true);
                        }}
                        placeholder="Search for manga..."
                        className={`w-full pl-10 pr-3 py-2 text-sm rounded-xl bg-white/5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 text-white placeholder-gray-400 ${
                            isQueryEmpty
                                ? "border-red-500/70 focus:border-red-400"
                                : "border-white/10 focus:border-purple-500/50"
                        }`}
                    />
                    {/* پیشنهادات - با عرض برابر اینپوت */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-50">
                            <SuggestionsDropdown
                                suggestions={suggestions}
                                activeIndex={activeIndex}
                                onSuggestionClick={handleSuggestionClick}
                                onMouseEnter={(idx) => setActiveIndex(idx)}
                                isLoading={isLoadingSuggestions}
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <SearchTypeDropdown
                        selectedType={searchType}
                        onSelectType={setSearchType}
                        onSearch={performSearch}
                        isLoading={isLoading || isAiLoading}
                    />
                    <SearchModeSelector onTextMode={onTextMode} isTextModeActive={isTextModeActive} />
                </div>
            </Form>
        </div>
    );
}