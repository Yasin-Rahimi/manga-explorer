export default function MangaBackground({ imageUrl }) {
    return (
        
        <div className="absolute top-0 left-0 right-0 h-87.5 sm:h-105 md:h-125 lg:h-140 opacity-20 pointer-events-none overflow-hidden">
            
            <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover blur-[60px] sm:blur-[80px] scale-125 translate-y-[-20%]"
            />
            
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#09080e]/70 to-[#09080e]"></div>
            
        </div>

    );
}