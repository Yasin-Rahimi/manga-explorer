export default function MangaSynopsis({ synopsis }) {
    return (
        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 sm:p-6 backdrop-blur-md">
            
            <h2 className="flex items-center gap-2 border-b border-purple-500/20 pb-2 mb-3 text-lg sm:text-xl font-bold text-white">
                <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                Synopsis
            </h2>

            <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed font-light text-gray-300 wrap-break-word">
                {synopsis ? synopsis : "No description has been written for this manga."}
            </p>
            
        </div>
    );
}