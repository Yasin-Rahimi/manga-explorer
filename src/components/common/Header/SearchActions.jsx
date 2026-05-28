// src/components/common/Header/SearchActions.jsx

export default function SearchActions({ isLoading, extraButton, isMobileMenu }) {
    if (isMobileMenu) {
        return (
            <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 bg-purple-600 hover:bg-purple-700 py-2.5 rounded-xl text-white font-medium text-sm transition"
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none whitespace-nowrap bg-linear-to-r from-purple-600 to-indigo-600 px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm text-white font-medium cursor-pointer hover:from-purple-500 hover:to-indigo-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
            {extraButton && extraButton}
        </div>
    );
}