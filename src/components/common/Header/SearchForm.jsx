import { useState, useRef, useEffect, useCallback } from "react";
import { Form, useNavigation } from "react-router";
import { FaSearch } from "react-icons/fa";
import { searchManga } from "../../../lib/api";
import SuggestionsDropdown from "./SuggestionsDropdown";

// هوک سفارشی برای تشخیص breakpoint
function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = (e) => setMatches(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query, matches]);

    return matches;
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export default function SearchForm() {
    const navigation = useNavigation();
    const [isQueryEmpty, setIsQueryEmpty] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const abortControllerRef = useRef(null);
    const wrapperRef = useRef(null);
    const isLoading = navigation.state === "submitting";

    // تشخیص موبایل (عرض کمتر از 640px)
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const fetchSuggestions = useCallback(async (query) => {
        // اگر در موبایل هستیم، هیچ درخواستی نزن و پیشنهادات را خالی کن
        if (!isDesktop) {
            setSuggestions([]);
            return;
        }
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const data = await searchManga(query, { signal: controller.signal });
            const sorted = (data?.data ?? [])
                .slice()
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
            const results = sorted.slice(0, 4);
            setSuggestions(results);
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error("Failed to fetch suggestions", err);
                setSuggestions([]);
            }
        }
    }, [isDesktop]);

    const debouncedFetch = useCallback(debounce(fetchSuggestions, 200), [fetchSuggestions]);

    useEffect(() => {
        if (!isDesktop) {
            // در موبایل، پیشنهادات را پاک کن و نمایش نده
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
        }
    }, [inputValue, debouncedFetch, isDesktop]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                    name="q"
                    type="text"
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
                {/* فقط در حالت دسکتاپ و در صورت وجود پیشنهادات، dropdown نشان داده شود */}
                {isDesktop && showSuggestions && (
                    <SuggestionsDropdown suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
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