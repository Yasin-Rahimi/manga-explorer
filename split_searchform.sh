#!/bin/bash

# ── 1. Extract the search input + mode toggle into SearchInput.jsx ──
cat << 'EOF' > src/components/common/Header/SearchInput.jsx
import { useRef, useEffect } from "react";
import { FaSearch, FaRobot } from "react-icons/fa";

/**
 * Search input with integrated AI/normal mode toggle.
 * The sliding purple indicator shows the currently active mode.
 */
export default function SearchInput({
    isAIMode,
    isQueryEmpty,
    isDesktop,
    inputValue,
    inputRef,
    onInputChange,
    onFocus,
    onToggleMode
}) {
    // Focus input when "/" is pressed (only on desktop, outside mobile menu)
    useEffect(() => {
        const handleSlash = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleSlash);
        return () => document.removeEventListener('keydown', handleSlash);
    }, [inputRef]);

    return (
        <div className="relative flex-1">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center z-10">
                <div
                    className={`absolute left-0 top-0 h-full w-7 transition-all duration-300 ease-out bg-purple-500/30 rounded-md ${
                        isAIMode ? 'translate-x-full' : 'translate-x-0'
                    }`}
                    style={{ width: '28px' }}
                />
                <button
                    type="button"
                    onClick={() => onToggleMode('normal')}
                    className={`cursor-pointer relative p-1 rounded-md transition-colors w-7 h-7 flex items-center justify-center ${
                        !isAIMode ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Normal search"
                >
                    <FaSearch className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => onToggleMode('ai')}
                    className={`cursor-pointer relative p-1 rounded-md transition-colors w-7 h-7 flex items-center justify-center ${
                        isAIMode ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                    }`}
                    title="AI search"
                >
                    <FaRobot className="w-4 h-4" />
                </button>
            </div>
            <input
                ref={inputRef}
                name="q"
                type="text"
                autoComplete="new-password"
                value={inputValue}
                onChange={onInputChange}
                onFocus={onFocus}
                placeholder={isAIMode ? "Ask AI to find manga..." : "Search for manga..."}
                className={`
                    w-full pl-18 pr-3 py-2 text-sm rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-white placeholder-gray-400
                    ${isAIMode 
                        ? 'border-purple-400 bg-purple-900/30 focus:ring-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]' 
                        : 'bg-white/5 border-white/10 focus:ring-purple-500/50 focus:bg-white/10'
                    }
                    ${isQueryEmpty ? 'border-red-500' : ''}
                `}
            />
        </div>
    );
}
EOF

# ── 2. Extract the suggestion dropdown wrapper into SearchSuggestions.jsx ──
cat << 'EOF' > src/components/common/Header/SearchSuggestions.jsx
import SuggestionsDropdown from "./SuggestionsDropdown";

/**
 * Conditionally renders the suggestion dropdown based on device,
 * loading state, and available suggestions.
 */
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

    // Desktop always shows, mobile only inside the mobile menu sidebar
    if (isDesktop) return dropdown;
    if (isMobileMenu) return dropdown;
    return null;
}
EOF

# ── 3. Rewrite SearchForm.jsx to use the new sub‑components ──
cat << 'EOF' > src/components/common/Header/SearchForm.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { Form, useNavigate } from "react-router";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

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

export default function SearchForm({ cameraButton, isMobileMenu = false, onSearchComplete }) {
    const navigate = useNavigate();
    const [isAIMode, setIsAIMode] = useState(false);
    const [isQueryEmpty, setIsQueryEmpty] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const abortControllerRef = useRef(null);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
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
            const results = sorted.slice(0, 3);
            const customSuggestions = [{ title: query, isCustom: true }, ...results];
            setSuggestions(customSuggestions);
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
                    if (isMobileMenu && onSearchComplete) onSearchComplete();
                    performSearch(isAIMode, selected.title);
                }
            } else if (e.key === "Escape") {
                setShowSuggestions(false);
                setActiveIndex(-1);
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [showSuggestions, suggestions, activeIndex, isMobileMenu, onSearchComplete, isAIMode]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsQueryEmpty(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.title);
        setShowSuggestions(false);
        if (isMobileMenu && onSearchComplete) onSearchComplete();
        performSearch(isAIMode, suggestion.title);
    };

    const performSearch = (useAI, queryText) => {
        const searchQuery = queryText || inputValue.trim();
        if (!searchQuery) {
            setIsQueryEmpty(true);
            return;
        }
        if (isMobileMenu && onSearchComplete) onSearchComplete();

        if (useAI) {
            navigate(`/ai-search?q=${encodeURIComponent(searchQuery)}`, { state: { fresh: true } });
        } else {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setIsQueryEmpty(true);
            return;
        }
        performSearch(isAIMode, inputValue.trim());
    };

    const toggleMode = (mode) => {
        setIsAIMode(mode === 'ai');
    };

    const handleInputFocus = () => {
        if (isDesktop && inputValue.trim()) setShowSuggestions(true);
    };

    return (
        <div
            className={`relative flex items-center gap-2 ${isMobileMenu ? 'w-full' : 'w-full sm:w-96 md:w-100'}`}
            ref={wrapperRef}
        >
            <Form
                method="get"
                action="/search"
                className="flex-1 relative flex items-stretch gap-2"
                onSubmit={handleSubmit}
            >
                <SearchInput
                    isAIMode={isAIMode}
                    isQueryEmpty={isQueryEmpty}
                    isDesktop={isDesktop}
                    inputValue={inputValue}
                    inputRef={inputRef}
                    onInputChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onToggleMode={toggleMode}
                />
            </Form>

            {cameraButton}

            <SearchSuggestions
                isDesktop={isDesktop}
                isMobileMenu={isMobileMenu}
                showSuggestions={showSuggestions}
                suggestions={suggestions}
                isLoadingSuggestions={isLoadingSuggestions}
                activeIndex={activeIndex}
                onSuggestionClick={handleSuggestionClick}
                onMouseEnter={(idx) => setActiveIndex(idx)}
            />
        </div>
    );
}
EOF

echo "✅ SearchForm split into SearchInput and SearchSuggestions components."