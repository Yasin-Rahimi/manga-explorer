export default function MangaMetaPanel({ chapters, volumes, publishedString, authorName }) {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 rounded-2xl border border-white/5 bg-linear-to-br from-white/4 to-transparent p-4 sm:p-6 backdrop-blur-md">
           
            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Chapters</span>
                <span className="text-sm sm:text-base font-bold text-white wrap-break-word">{chapters ?? "Unknown"}</span>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Volumes</span>
                <span className="text-sm sm:text-base font-bold text-white wrap-break-word">{volumes ?? "Unknown"}</span>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
                
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Published</span>

                <span className="text-xs sm:text-sm font-bold text-white wrap-break-word" title={publishedString}>
                    {publishedString ?? "Unknown"}
                </span>

            </div>

            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Author</span>

                <span className="text-sm font-bold text-purple-300 wrap-break-word" title={authorName}>
                    {authorName ?? "Unknown"}
                </span>

            </div>
            
        </div>

    );
}