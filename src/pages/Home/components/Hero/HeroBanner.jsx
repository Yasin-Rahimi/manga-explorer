// src/pages/Home/components/Hero/HeroBanner.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import HeroSlide from "./HeroSlide";
import HeroNavigation from "./HeroNavigation";
import HeroIndicators from "./HeroIndicators";
import HeroProgressBar from "./HeroProgressBar";

export default function HeroBanner({ mangas, keyboardMode, setKeyboardMode }) {
    const navigate = useNavigate();
    const visibleMangas = mangas.slice(0, 5);
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrent((prev) => (prev === visibleMangas.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? visibleMangas.length - 1 : prev - 1));
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) nextSlide();
        else if (isRightSwipe) prevSlide();
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    // فقط در حالت hero به کلیدها پاسخ بده
    useEffect(() => {
        if (keyboardMode !== 'hero') return;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key >= '1' && e.key <= '5') {
                const index = parseInt(e.key) - 1;
                if (index < visibleMangas.length) setCurrent(index);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const currentManga = visibleMangas[current];
                if (currentManga) {
                    navigate(`/manga/${currentManga.mal_id}`);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [keyboardMode, visibleMangas, current, navigate, prevSlide, nextSlide]);

    // اسلاید خودکار
    useEffect(() => {
        if (!visibleMangas.length) return;
        const interval = setInterval(nextSlide, 8000);
        return () => clearInterval(interval);
    }, [visibleMangas.length, nextSlide]);

    // با کلیک روی بنر حالت را hero کن
    useEffect(() => {
        const handleClick = () => {
            if (keyboardMode !== 'hero') setKeyboardMode('hero');
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [keyboardMode, setKeyboardMode]);

    if (!visibleMangas.length) return null;

    return (
        <div
            className="relative w-full h-112.5 sm:h-87.5 md:h-102.5 lg:h-112.5 xl:h-122.5 2xl:h-132.5 rounded-2xl sm:rounded-3xl xl:rounded-4xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/5 bg-[#0f0f11] group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
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