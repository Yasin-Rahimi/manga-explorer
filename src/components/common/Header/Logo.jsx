// src/components/common/Header/Logo.jsx
import { Link } from "react-router";
import { FaBookOpen } from "react-icons/fa";

export default function Logo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-3 group transition-transform hover:scale-[1.02] w-auto"
        >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs sm:text-base text-white font-bold shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 shrink-0">
                <FaBookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-sm sm:text-lg md:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-gray-400 group-hover:via-white group-hover:to-gray-200 transition-all duration-300 leading-tight">
                Manga Explorer
            </span>
        </Link>
    );
}