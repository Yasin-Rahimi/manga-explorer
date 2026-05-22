export default function Empty({ message = "Nothing found." }) {
    return (
        <div className="w-full flex flex-col justify-center items-center py-14 px-6 text-center max-w-sm mx-auto">
            <div className="relative mb-5 group">
                {/* Soft backdrop radial light */}
                <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-xl scale-125 transition-transform duration-500 group-hover:scale-150"></div>
                
                {/* Floating Book/Manga container */}
                <div className="relative w-16 h-16 bg-neutral-900/60 rounded-2xl border border-white/5 flex items-center justify-center shadow-lg backdrop-blur-sm animate-[bounce_4s_infinite_ease-in-out]">
                    <svg className="w-8 h-8 text-neutral-500 group-hover:text-purple-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {/* Small visual sparkle sparks */}
                    <span className="absolute -top-1 -right-1 text-xs text-purple-400/80 animate-pulse">✨</span>
                </div>
            </div>

            {/* Empty result message */}
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-normal">
                {message}
            </p>
        </div>
    );
}
