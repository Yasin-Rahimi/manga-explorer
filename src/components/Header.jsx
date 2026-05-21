// src/components/Header.jsx
import { Link } from "react-router";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-purple-900/40 shadow-lg shadow-purple-900/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                        M
                    </div>
                    <h1 className="text-2xl font-black bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                        Manga<span className="text-white/80">Explorer</span>
                    </h1>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-8 text-sm font-medium">
                    <Link
                        to="/"
                        className="relative text-white/80 hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom after:scale-x-0 after:bg-linear-to-r after:from-purple-500 after:to-blue-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                        Home
                    </Link>
                    <span className="text-white/40 hover:text-purple-300 cursor-not-allowed transition-colors duration-200">
                        Favorites
                    </span>
                    <span className="text-white/40 hover:text-purple-300 cursor-not-allowed transition-colors duration-200">
                        About
                    </span>
                </nav>
            </div>
        </header>
    );
}