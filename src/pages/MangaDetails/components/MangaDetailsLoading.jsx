export default function MangaDetailsLoading() {
    return (

        <div className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center justify-center gap-4 px-4 text-center">
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            
            <p className="text-sm sm:text-base text-purple-300 font-medium tracking-wide animate-pulse">
                Loading manga details...
            </p>
            
        </div>

    );
}