export default function MangaCover({ imageUrl, title, status }) {
    return (

        <div className="relative group w-full max-w-65 sm:max-w-[320px] lg:max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(147,51,234,0.3)]">
            
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-95 sm:h-112.5 md:h-130 lg:h-155 object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40"></div>
            
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-purple-600 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-md shadow-lg max-w-[80%] truncate">
                {status ?? "Unknown"}
            </div>

        </div>
        
    );
}