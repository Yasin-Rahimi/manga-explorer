// src/pages/Home/Home.jsx
import { useState, useEffect } from "react";
import HeroSection from "./components/Hero/HeroSection";
import TrendingSection from "./components/TrendingSection";
import { getTopManga } from "../../lib/api";

const ERROR_MESSAGE = "Failed to load trending manga.";
const STORAGE_PAGE_KEY = "trendingPage";

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // بازیابی صفحه ذخیره شده هنگام mount شدن کامپوننت
    useEffect(() => {
        const savedPage = sessionStorage.getItem(STORAGE_PAGE_KEY);
        if (savedPage) {
            const parsedPage = parseInt(savedPage, 10);
            if (!isNaN(parsedPage) && parsedPage !== page) {
                setPage(parsedPage);
            }
        }
    }, []); // فقط یک بار اجرا می‌شود

    // ذخیره صفحه در sessionStorage هر بار که تغییر می‌کند
    useEffect(() => {
        // همیشه صفحه جاری را ذخیره کن (حتی صفحه ۱، تا در صورت بازگشت از صفحات دیگر بازیابی شود)
        sessionStorage.setItem(STORAGE_PAGE_KEY, page);
    }, [page]);

    // دریافت داده‌ها هنگام تغییر صفحه
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getTopManga(page);
                const fetchedData = res.data ?? [];
                setTrending(fetchedData);
                setLastPage(res.pagination?.last_visible_page ?? 1);
            } catch (err) {
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
            <HeroSection mangas={heroMangas} />
            <TrendingSection
                trending={trendingMangas}
                page={page}
                setPage={setPage}
                lastPage={lastPage}
                loading={loading}
                error={error}
            />
        </div>
    );
}