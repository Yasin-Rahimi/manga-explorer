import { useState, useRef, useEffect, useCallback } from "react";
import { Form, useNavigation } from "react-router";
import { FaSearch } from "react-icons/fa";
import { searchManga } from "../../../lib/api";
import SuggestionsDropdown from "./SuggestionsDropdown";

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

export default function SearchForm() {
    const navigation = useNavigation();
    const [isQueryEmpty, setIsQueryEmpty] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const abortControllerRef = useRef(null);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const isLoading = navigation.state === "submitting";
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const fetchSuggestions = useCallback(async (query) => {
        if (!isDesktop) {
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
    }, [isDesktop]);

    const debouncedFetch = useCallback(debounce(fetchSuggestions, 200), [fetchSuggestions]);

    useEffect(() => {
        if (!isDesktop) {
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
    }, [inputValue, debouncedFetch, isDesktop]);

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
    }, [showSuggestions, suggestions, activeIndex]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsQueryEmpty(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.title);
        setShowSuggestions(false);
        window.location.href = `/search?q=${encodeURIComponent(suggestion.title)}`;
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        const input = form.querySelector('input[name="q"]');
        if (!input.value.trim()) {
            e.preventDefault();
            setIsQueryEmpty(true);
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        const handleSlash = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleSlash);
        return () => document.removeEventListener('keydown', handleSlash);
    }, []);

    return (
        <Form
            method="get"
            action="/search"
            className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            ref={wrapperRef}
            onSubmit={handleSubmit}
        >
            <div className="relative group w-full">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none" />
                <input
                    ref={inputRef}
                    name="q"
                    type="text"
                    autoComplete="new-password"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => {
                        if (isDesktop && inputValue.trim()) setShowSuggestions(true);
                    }}
                    placeholder="Search for manga..."
                    className={`w-full min-w-0 sm:w-70 md:w-[320px] lg:w-90 pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border transition-all duration-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 text-white placeholder-gray-400 ${
                        isQueryEmpty
                            ? "border-red-500/70 focus:border-red-400"
                            : "border-white/10 focus:border-purple-500/50"
                    }`}
                />
                {isDesktop && showSuggestions && (
                    <SuggestionsDropdown
                        suggestions={suggestions}
                        activeIndex={activeIndex}
                        onSuggestionClick={handleSuggestionClick}
                        onMouseEnter={(idx) => setActiveIndex(idx)}
                        isLoading={isLoadingSuggestions}
                    />
                )}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto whitespace-nowrap bg-linear-to-r from-purple-600 to-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-white font-medium cursor-pointer hover:from-purple-500 hover:to-indigo-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        </Form>
    );
}