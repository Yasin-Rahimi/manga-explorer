import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-xl mt-16 overflow-hidden">
            {/* Decorative top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
                    {/* Brand column */}
                    <div className="space-y-4 md:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/25">
                                M
                            </div>
                            <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                Manga Explorer
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-md text-base">
                            Discover your next story. Immerse yourself in the world of manga with our curated collection, beautifully presented for your reading pleasure.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400 font-medium">
                            {[
                                {name: 'Home', to: '/'},
                                {name: 'Trending', to: '/'},
                                {name: 'Genres', to: '/'}
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link to={link.to} className="hover:text-purple-400 hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Stay Connected</h3>
                        <div className="flex gap-3 text-gray-400">
                            {[
                                { icon: '𝕏', title: 'Twitter', link: 'Twitter.com'},
                                { icon: '🎮', title: 'Discord', link: 'Discord.com' },
                                { icon: '💬', title: 'Reddit', link: 'Reddit.com' }
                            ].map((social) => (
                                <a
                                    key={social.title}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg cursor-pointer hover:bg-purple-500/20 hover:text-purple-400 border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                                    title={social.title}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 font-medium">
                    <p>© {new Date().getFullYear()} Manga Explorer. All rights reserved.</p>
                    <p className="mt-4 sm:mt-0 flex items-center gap-1.5">
                        Made with <span className="text-red-500 animate-pulse text-lg">❤️</span> for anime lovers
                    </p>
                </div>
            </div>
        </footer>
    );
}
