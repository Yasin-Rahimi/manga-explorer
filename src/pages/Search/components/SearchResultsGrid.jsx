import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MangaCard from "../../../components/common/MangaCard";

export default function SearchResultsGrid({ results, sort }) {

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(-1);
    const cardRefs = useRef([]);

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, results.length);
    }, [results]);

    useEffect(() => {

        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const total = results.length;
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
                    newIndex = activeIndex - cols;
                    if (newIndex < 0) newIndex = activeIndex;
                    break;
                case 'Enter':
                    if (activeIndex >= 0 && results[activeIndex]) {
                        e.preventDefault();
                        navigate(`/manga/${results[activeIndex].mal_id}`);
                        return;
                    }
                    break;
                default:
                    return;
            }

            if (newIndex !== activeIndex) {
                e.preventDefault();
                setActiveIndex(newIndex);
                if (cardRefs.current[newIndex]) {
                    cardRefs.current[newIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }

        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);

    }, [activeIndex, results, navigate]);

    useEffect(() => {
        setActiveIndex(-1);
    }, [results]);

    let sortedResults = [...results];

    if (sort === 'rate') {
        sortedResults.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    } else if (sort === 'az') {
        sortedResults.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
    }

    if (sortedResults.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            
            {sortedResults.map((manga, index) => (
                <div
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className={`min-w-0 transition-all duration-200 ${
                        activeIndex === index ? 'ring-2 ring-purple-500 scale-[1.02] rounded-xl' : ''
                    }`}
                >
                    <MangaCard manga={manga} />
                </div>
            ))}

        </div>
    );
}