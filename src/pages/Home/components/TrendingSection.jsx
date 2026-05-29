import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MangaCard from "../../../components/common/MangaCard";
import Pagination from "./Pagination";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import Empty from "../../../components/ui/Empty";

export default function TrendingSection({
    trending,
    page,
    setPage,
    lastPage,
    loading,
    error,
    keyboardMode,
    setKeyboardMode
}) {

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(-1);
    const cardRefs = useRef([]);

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, trending.length);
    }, [trending]);

    useEffect(() => {
        setActiveIndex(-1);
    }, [trending]);

    useEffect(() => {

        if (keyboardMode !== 'trending') return;

        const handleKeyDown = (e) => {

            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const total = trending.length;
            if (total === 0) return;

            let newIndex = activeIndex;
            const cols = 4;

            switch (e.key) {
                case 'ArrowRight':
                    newIndex = activeIndex + 1;
                    if (newIndex >= total) newIndex = total - 1;
                    break;
                case 'ArrowLeft':
                    newIndex = activeIndex - 1;
                    if (newIndex < 0) newIndex = 0;
                    break;
                case 'ArrowDown':
                    newIndex = activeIndex + cols;
                    if (newIndex >= total) newIndex = activeIndex;
                    break;
                case 'ArrowUp':
                    if (activeIndex < cols) {
                        e.preventDefault();
                        setKeyboardMode('hero');
                        return;
                    }
                    newIndex = activeIndex - cols;
                    if (newIndex < 0) newIndex = activeIndex;
                    break;
                case 'Enter':
                    if (activeIndex >= 0 && trending[activeIndex]) {
                        e.preventDefault();
                        navigate(`/manga/${trending[activeIndex].mal_id}`);
                        return;
                    }
                    break;
                default:
                    return;
            }

            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < total) {
                e.preventDefault();
                setActiveIndex(newIndex);
                cardRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);

    }, [activeIndex, trending, navigate, keyboardMode, setKeyboardMode]);

    useEffect(() => {

        const handleClick = (e) => {
            if (e.target.closest('.manga-card-container') && keyboardMode !== 'trending') {
                setKeyboardMode('trending');
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);

    }, [keyboardMode, setKeyboardMode]);

    if (!loading && !error && trending.length === 0) {
        return <Empty message="No trending manga found." />;
    }

    return (

        <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 overflow-hidden">
            {
            trending.length > 0 && (
                <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-bold">
                    Trend Mangas
                </h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full">
                {trending.map((manga, index) => (
                    <div
                        key={index}
                        ref={el => cardRefs.current[index] = el}
                        className={`manga-card-container min-w-0 transition-all duration-200 ${
                            activeIndex === index ? 'ring-2 ring-purple-500 scale-[1.02] rounded-xl' : ''
                        }`}
                    >
                        <MangaCard manga={manga} />
                    </div>
                ))}
            </div>

            {trending.length > 0 && (
                <div className="mt-8 sm:mt-10">
                    <Pagination page={page} setPage={setPage} lastPage={lastPage} />
                </div>
            )}

            {loading && <Loading text="Loading trending manga..." />}
            
            {error && <Error message={error} />}

        </section>

    );
}