import { Link, useLocation } from "react-router";
import BackButton from "./BackButton";

export default function Header({ query, setQuery, handleSearch }) {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header
            className="
                sticky top-0 z-50 w-full
                border-b border-white/5
                bg-black/30 backdrop-blur-xl
                shadow-lg shadow-black/20
            "
        >
            <div
                className="
                    max-w-7xl mx-auto
                    flex flex-col sm:flex-row
                    items-start sm:items-center
                    justify-between
                    gap-4 sm:gap-5
                    px-4 sm:px-6 md:px-8
                    py-3 sm:py-4
                "
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="
                        flex items-center gap-2 sm:gap-3
                        group transition-transform hover:scale-[1.02]
                        w-full sm:w-auto
                    "
                >
                    <div
                        className="
                            w-8 h-8 sm:w-9 sm:h-9
                            rounded-xl
                            bg-linear-to-br from-purple-500 to-indigo-600
                            flex items-center justify-center
                            text-sm sm:text-base
                            text-white font-bold
                            shadow-lg shadow-purple-500/25
                            group-hover:shadow-purple-500/40
                            transition-all duration-300
                            shrink-0
                        "
                    >
                        M
                    </div>

                    <span
                        className="
                            text-base sm:text-lg md:text-xl
                            font-extrabold tracking-tight
                            bg-clip-text text-transparent
                            bg-linear-to-r from-white via-gray-200 to-gray-400
                            group-hover:via-white group-hover:to-gray-200
                            transition-all duration-300
                            leading-tight
                            wrap-break-word
                        "
                    >
                        Manga Explorer
                    </span>
                </Link>

                {/* فقط در Home نمایش داده شود */}
                {isHome ? (
                    <form
                        onSubmit={handleSearch}
                        className="
                            flex flex-col sm:flex-row
                            items-stretch sm:items-center
                            gap-3
                            w-full sm:w-auto
                        "
                    >
                        <div className="relative group w-full">
                            {/* Decorative Search Icon */}
                            <svg
                                className="
                                    absolute left-3 top-1/2 -translate-y-1/2
                                    w-4 h-4
                                    text-gray-400
                                    group-focus-within:text-purple-400
                                    transition-colors
                                    pointer-events-none
                                "
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for manga..."
                                className="
                                    w-full
                                    min-w-0
                                    sm:w-70
                                    md:w-[320px]
                                    lg:w-90
                                    pl-10 pr-4
                                    py-2.5 sm:py-3
                                    text-sm sm:text-base
                                    rounded-xl
                                    bg-white/5
                                    border border-white/10
                                    text-white placeholder-gray-400
                                    focus:outline-none
                                    focus:ring-2 focus:ring-purple-500/50
                                    focus:border-purple-500/50
                                    focus:bg-white/10
                                    transition-all duration-300
                                    shadow-inner
                                "
                            />
                        </div>

                        <button
                            className="
                                w-full sm:w-auto
                                whitespace-nowrap
                                bg-linear-to-r from-purple-600 to-indigo-600
                                px-5 sm:px-6
                                py-2.5 sm:py-3
                                rounded-xl
                                text-sm sm:text-base
                                text-white font-medium
                                cursor-pointer
                                hover:from-purple-500 hover:to-indigo-500
                                focus:ring-2 focus:ring-purple-500/50
                                focus:outline-none
                                shadow-lg shadow-purple-500/25
                                hover:shadow-purple-500/40
                                transition-all duration-300
                                transform active:scale-95
                            "
                        >
                            Search
                        </button>
                    </form>
                ) : (
                    <div className="w-full sm:w-auto flex justify-start sm:justify-end">
                        <BackButton />
                    </div>
                )}
            </div>
        </header>
    );
}