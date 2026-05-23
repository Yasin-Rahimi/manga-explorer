export default function HeroIndicators({ total, current, onSelect }) {
    return (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        current === index
                            ? "w-8 bg-purple-400"
                            : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                />
            ))}
        </div>
    );
}