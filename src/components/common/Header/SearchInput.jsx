// src/components/common/Header/SearchInput.jsx
import { forwardRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = forwardRef(({ value, onChange, onFocus, placeholder, isQueryEmpty, isMobileMenu }, ref) => {
    const baseClasses = "w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400";
    const desktopClasses = "pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-white/5 border-white/10 focus:bg-white/10";
    const mobileClasses = "bg-white/10 border-white/20 focus:bg-white/20";
    const errorClasses = isQueryEmpty ? "border-red-500/70 focus:border-red-400" : "border-white/20 focus:border-purple-500/50";

    return (
        <div className="relative group flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none" />
            <input
                ref={ref}
                name="q"
                type="text"
                autoComplete="new-password"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                className={`${baseClasses} ${isMobileMenu ? mobileClasses : desktopClasses} ${errorClasses}`}
            />
        </div>
    );
});

export default SearchInput;