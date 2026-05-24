import { Link } from "react-router";
import { FaBookOpen } from "react-icons/fa";

export default function Logo() {
    return (
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
    );
}