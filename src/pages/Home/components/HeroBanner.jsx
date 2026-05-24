import { useEffect, useState } from "react";
import HeroSlide from "./HeroSlide";
import HeroNavigation from "./HeroNavigation";
import HeroIndicators from "./HeroIndicators";
import HeroProgressBar from "./HeroProgressBar";

export default function HeroBanner({ mangas }) {
    const visibleMangas = mangas.slice(0, 5);
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === visibleMangas.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? visibleMangas.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!visibleMangas.length) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(interval);
    }, [visibleMangas.length]);

    if (!visibleMangas.length) return null;

    return (
        <div className="relative w-full h-112.5 sm:h-87.5 md:h-102.5 lg:h-112.5 xl:h-122.5 2xl:h-132.5 rounded-2xl sm:rounded-3xl xl:rounded-4xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/5 bg-[#0f0f11] group">
            <style>{`
                @keyframes banner-progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-banner-progress {
                    animation: banner-progress 8s linear forwards;
                }
            `}</style>

            <div
                className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {visibleMangas.map((manga) => (
                    <HeroSlide key={manga.mal_id} manga={manga} />
                ))}
            </div>

            <HeroNavigation onPrev={prevSlide} onNext={nextSlide} />
            <HeroIndicators total={visibleMangas.length} current={current} onSelect={setCurrent} />
            <HeroProgressBar keyValue={current} />
        </div>
    );
}