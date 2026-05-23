import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HeroNavigation({ onPrev, onNext }) {
    return (
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-30 flex items-center justify-between px-3 sm:px-5 pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 cursor-pointer hover:scale-110">
                <FaChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 cursor-pointer hover:scale-110">
                <FaChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}