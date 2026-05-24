import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, Form, useNavigation } from "react-router";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import BackButton from "./BackButton";
import { searchManga } from "../../lib/api";

// دبناز کردن فراخوانی تابع
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export default function Header() {
    const location = useLocation();
    const navigation = useNavigation();
    const isHome = location.pathname === "/";

    // State برای اعتبارسنجی خالی بودن
    const [isQueryEmpty, setIsQueryEmpty] = useState(false);
    // Stateهای مربوط به autocomplete
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState(""); // مقدار واقعی input
    const abortControllerRef = useRef(null);
    const wrapperRef = useRef(null); // برای تشخیص کلیک خارج از dropdown

    const isLoading = navigation.state === "submitting";

    // تابع fetch پیشنهادات
    const fetchSuggestions = useCallback(async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        // لغو درخواست قبلی اگر هنوز کامل نشده
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            // فراخوانی API جستجو (همان searchManga)
            const data = await searchManga(query, { signal: controller.signal });
            const results = (data?.data ?? []).slice(0, 5); // حداکثر ۵ نتیجه
            setSuggestions(results);
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error("Failed to fetch suggestions", err);
                setSuggestions([]);
            }
        }
    }, []);

    // دبناز کردن fetchSuggestions (با تأخیر 300 میلی‌ثانیه)
    const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

    // هر بار که inputValue تغییر می‌کند، fetch جدید را آغاز کن
    useEffect(() => {
        if (inputValue.trim()) {
            debouncedFetch(inputValue);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [inputValue, debouncedFetch]);

    // بستن dropdown با کلیک خارج از آن
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
        setIsQueryEmpty(false); // در حین تایپ خطا را برطرف کن
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.title);
        setShowSuggestions(false);
        // فرم را به صورت برنامه‌ای ارسال کن (با استفاده از navigate)
        // از آنجا که ما از Form استفاده می‌کنیم، بهتر است مستقیماً نویگیت کنیم
        window.location.href = `/search?q=${encodeURIComponent(suggestion.title)}`;
        // یا اگر از useNavigate می‌خواهید استفاده کنید، باید useNavigate را import کنید
        // ولی چون این کامپوننت قبلاً Form دارد، برای سادگی از window.location استفاده شد.
    };

    // برای ارسال فرم به طور معمولی (با دکمه یا Enter)
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
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl shadow-lg shadow-black/20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 sm:gap-3 group transition-transform hover:scale-[1.02] w-full sm:w-auto"
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm sm:text-base text-white font-bold shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 shrink-0">
                        <FaBookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-gray-400 group-hover:via-white group-hover:to-gray-200 transition-all duration-300 leading-tight wrap-break-word">
                        Manga Explorer
                    </span>
                </Link>

                {isHome ? (
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
                                    if (inputValue.trim()) setShowSuggestions(true);
                                }}
                                placeholder="Search for manga..."
                                className={`w-full min-w-0 sm:w-70 md:w-[320px] lg:w-90 pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border transition-all duration-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 text-white placeholder-gray-400 ${
                                    isQueryEmpty
                                        ? "border-red-500/70 focus:border-red-400"
                                        : "border-white/10 focus:border-purple-500/50"
                                }`}
                            />
                            {/* Dropdown پیشنهادات */}
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 top-full mt-1 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {suggestions.map((manga) => (
                                        <li
                                            key={manga.mal_id}
                                            onClick={() => handleSuggestionClick(manga)}
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
                ) : (
                    <div className="w-full sm:w-auto flex justify-start sm:justify-end">
                        <BackButton />
                    </div>
                )}
            </div>
        </header>
    );
}