// src/components/Footer.jsx
export default function Footer() {
    return (
        <footer className="border-t border-purple-900/30 bg-black/40 backdrop-blur-sm mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    {/* Brand column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                                M
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Manga Explorer
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Discover your next story. Immerse yourself in the world of manga with our curated collection.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-purple-400 transition-colors cursor-pointer">Trending</li>
                            <li className="hover:text-purple-400 transition-colors cursor-pointer">Popular</li>
                            <li className="hover:text-purple-400 transition-colors cursor-pointer">Genres</li>
                            <li className="hover:text-purple-400 transition-colors cursor-pointer">Random</li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Stay Connected</h3>
                        <div className="flex gap-4 text-gray-400">
                            <span className="hover:text-purple-400 transition-colors cursor-pointer text-lg" title="Twitter">𝕏</span>
                            <span className="hover:text-purple-400 transition-colors cursor-pointer text-lg" title="Discord">🎮</span>
                            <span className="hover:text-purple-400 transition-colors cursor-pointer text-lg" title="Reddit">💬</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-purple-900/20 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2025 Manga Explorer. All rights reserved.</p>
                    <p className="mt-1 sm:mt-0">Made with ❤️ for anime lovers</p>
                </div>
            </div>
        </footer>
    );
}