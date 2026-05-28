// src/pages/AISearch/AISearch.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router";
import { FaSearch, FaRobot } from "react-icons/fa";
import { askAi } from "../../lib/ai/askAi";
import { searchManga } from "../../lib/api";
import MangaCard from "../../components/common/MangaCard";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import Empty from "../../components/ui/Empty";

export default function AISearch() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";
    const fresh = location.state?.fresh === true; // فقط برای جلوگیری از کش در آینده (الان کشی وجود ندارد)

    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [aiNames, setAiNames] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isAIMode, setIsAIMode] = useState(true); // در صفحه AI پیش‌فرض روی حالت AI باشد

    useEffect(() => {
        if (!query) {
            setError("No search query provided.");
            setLoading(false);
            return;
        }

        // همیشه درخواست جدید بزن (بدون کش)
        const fetchAISuggestions = async () => {
            try {
                const prompt = `You are a manga recommendation engine. Based on the user's description, suggest 16 manga titles (full official English names) that best match. Return ONLY a JSON array of strings, no extra text. For example: ["Berserk", "Attack on Titan", ...]. User query: "${query}"`;
                const aiResponse = await askAi(prompt, { temperature: 0.3, max_tokens: 600 });
                let titles = [];
                try {
                    titles = JSON.parse(aiResponse);
                    if (!Array.isArray(titles)) throw new Error();
                } catch {
                    titles = aiResponse.split(/\n|,/).map(s => s.trim().replace(/[\[\]"']/g, '')).filter(Boolean);
                }
                const uniqueTitles = [...new Map(titles.map(t => [t.toLowerCase(), t])).values()];
                const finalTitles = uniqueTitles.slice(0, 16);
                setAiNames(finalTitles);

                const mangaPromises = finalTitles.map(async (title) => {
                    try {
                        const result = await searchManga(title);
                        if (result.data && result.data.length > 0) {
                            return result.data[0];
                        }
                        return null;
                    } catch {
                        return null;
                    }
                });
                const results = await Promise.all(mangaPromises);
                const validMangas = results.filter(m => m !== null);
                setMangas(validMangas);
            } catch (err) {
                console.error(err);
                setError("Failed to get AI recommendations. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAISuggestions();
    }, [query]); // وابستگی به fresh حذف شد (چون کش نداریم)

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        if (isAIMode) {
            navigate(`/ai-search?q=${encodeURIComponent(searchInput.trim())}`, { state: { fresh: true } });
        } else {
            window.location.href = `/search?q=${encodeURIComponent(searchInput.trim())}`;
        }
    };

    const toggleMode = () => {
        setIsAIMode(!isAIMode);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading text="AI is finding best matches..." /></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><Error message={error} /></div>;
    if (!loading && mangas.length === 0) return <div className="min-h-screen flex items-center justify-center"><Empty message="No manga found for your description." /></div>;

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">

                {/* عنوان با هایلایت بنفش */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mt-2">
                        AI Recommendations for:{" "}
                        <span className="text-purple-400">"{query}"</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Showing {mangas.length} results
                    </p>
                </div>

                {/* گرید کارت‌ها */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mangas.map(manga => (
                        <MangaCard key={manga.mal_id} manga={manga} />
                    ))}
                </div>
            </div>
        </div>
    );
}