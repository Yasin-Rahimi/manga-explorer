export default function HeroProgressBar({ keyValue }) {
    return (

        <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 bg-white/5 backdrop-blur-sm z-20">
            <div
                key={keyValue}
                className="h-full bg-linear-to-r from-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-banner-progress"
            />
        </div>
        
    );
}