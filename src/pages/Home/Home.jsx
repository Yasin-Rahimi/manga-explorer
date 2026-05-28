import { useState, useEffect, useRef } from "react";
import HeroSection from "./components/Hero/HeroSection";
import TrendingSection from "./components/TrendingSection";
import { getTopManga } from "../../lib/api";

const ERROR_MESSAGE = "Failed to load trending manga.";

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [keyboardMode, setKeyboardMode] = useState('hero');

    const heroRef = useRef(null);
    const trendingRef = useRef(null);

    // تعویض حالت با کلیدهای بالا و پایین
    useEffect(() => {
        const handleGlobalKeys = (e) => {
            if (e.key === 'ArrowDown' && keyboardMode === 'hero') {
                e.preventDefault();
                setKeyboardMode('trending');
                // اسکرول به بخش ترندینگ
                trendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (e.key === 'ArrowUp' && keyboardMode === 'trending') {
                e.preventDefault();
                setKeyboardMode('hero');
                heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        window.addEventListener('keydown', handleGlobalKeys);
        return () => window.removeEventListener('keydown', handleGlobalKeys);
    }, [keyboardMode]);

    // تغییر خودکار با اسکرول
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const heroBottom = heroRef.current.getBoundingClientRect().bottom;
            if (heroBottom < 100) {
                if (keyboardMode !== 'trending') setKeyboardMode('trending');
            } else {
                if (keyboardMode !== 'hero') setKeyboardMode('hero');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [keyboardMode]);

    // کلیک روی بخش‌ها
    useEffect(() => {
        const handleClickOnTrending = (e) => {
            if (trendingRef.current?.contains(e.target)) {
                setKeyboardMode('trending');
            }
        };
        const handleClickOnHero = (e) => {
            if (heroRef.current?.contains(e.target)) {
                setKeyboardMode('hero');
            }
        };
        document.addEventListener('click', handleClickOnTrending);
        document.addEventListener('click', handleClickOnHero);
        return () => {
            document.removeEventListener('click', handleClickOnTrending);
            document.removeEventListener('click', handleClickOnHero);
        };
    }, []);

    // fetch data مانند قبل
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getTopManga(page);
                setTrending(res.data ?? []);
                setLastPage(res.pagination?.last_visible_page ?? 1);
            } catch {
                setError(ERROR_MESSAGE);
                setTrending([]);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };
        fetchData();
    }, [page]);

    const heroMangas = trending.slice(0, 5);
    const trendingMangas = trending.slice(5);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">
            <div ref={heroRef}>
                <HeroSection 
                    mangas={heroMangas} 
                    keyboardMode={keyboardMode}
                    setKeyboardMode={setKeyboardMode}
                />
            </div>
            <div ref={trendingRef}>
                <TrendingSection
                    trending={trendingMangas}
                    page={page}
                    setPage={setPage}
                    lastPage={lastPage}
                    loading={loading}
                    error={error}
                    keyboardMode={keyboardMode}
                    setKeyboardMode={setKeyboardMode}
                />
            </div>
        </div>
    );
}