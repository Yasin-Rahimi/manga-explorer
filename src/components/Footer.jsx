import { Link, useLocation } from "react-router";
import { FaTwitter, FaDiscord, FaReddit } from "react-icons/fa";

export default function Footer() {
    const location = useLocation();

    const handleScroll = (id) => {
        if (!id) return;
        const cleanId = id.startsWith("#") ? id.slice(1) : id;
        const element = document.getElementById(cleanId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="relative mt-12 sm:mt-16 overflow-hidden border-t border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 sm:gap-10">
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 text-sm sm:text-base font-bold text-white shadow-lg shadow-purple-500/25">
                                M
                            </div>
                            <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent leading-tight wrap-break-word">
                                Manga Explorer
                            </span>
                        </div>
                        <p className="max-w-full sm:max-w-md text-sm sm:text-base leading-relaxed text-gray-400">
                            Discover your next story. Immerse yourself in the world of manga with our curated collection, beautifully presented for your reading pleasure.
                        </p>
                    </div>
                    <div className="min-w-0 sm:text-right">
                        <h3 className="mb-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                            Stay Connected
                        </h3>
                        <div className="flex flex-wrap gap-3 text-gray-400 sm:justify-end">
                            <a href="https://Twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-base sm:text-lg cursor-pointer transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-400" title="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://Discord.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-base sm:text-lg cursor-pointer transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-400" title="Discord">
                                <FaDiscord />
                            </a>
                            <a href="https://Reddit.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-base sm:text-lg cursor-pointer transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-400" title="Reddit">
                                <FaReddit />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 sm:mt-12 flex flex-col items-center justify-between gap-4 sm:gap-5 border-t border-white/5 pt-6 sm:pt-8 text-center sm:text-left text-xs sm:text-sm font-medium text-gray-500 md:flex-row">
                    <p className="leading-relaxed">© {new Date().getFullYear()} Manga Explorer. All rights reserved.</p>
                    <p className="flex flex-wrap items-center justify-center gap-1.5 leading-relaxed">
                        Made with <span className="animate-pulse text-lg text-red-500">❤️</span> for anime lovers
                    </p>
                </div>
            </div>
        </footer>
    );
}