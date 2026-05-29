import { useState, useEffect, useRef } from "react";
import HeroSection from "./components/Hero/HeroSection";
import TrendingSection from "./components/TrendingSection";
import { getTopManga } from "../../lib/api";

const ERROR_MESSAGE = "Failed to load trending manga.";
const STORAGE_PAGE_KEY = "trendingPage";

export default function Home() {

    const [page, setPage] = useState(() => {
        const saved = sessionStorage.getItem(STORAGE_PAGE_KEY);
        if (saved) {
            const parsed = parseInt(saved, 10);
            return isNaN(parsed) ? 1 : parsed;
        }
        return 1;
    });
    
    const [trending, setTrending] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [keyboardMode, setKeyboardMode] = useState('hero');

    const heroRef = useRef(null);
    const trendingRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem(STORAGE_PAGE_KEY, page);
    }, [page]);

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

    useEffect(() => {

        const handleClickOnTrending = (e) => {
            if (trendingRef.current && trendingRef.current.contains(e.target)) {
                setKeyboardMode('trending');
            }
        };

        document.addEventListener('click', handleClickOnTrending);
        return () => document.removeEventListener('click', handleClickOnTrending);

    }, []);

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

        <div className="h-fit bg-linear-to-br from-black via-purple-950 to-black text-white">
            
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