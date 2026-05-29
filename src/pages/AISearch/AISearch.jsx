import { useEffect, useState } from "react";
import { useSearchParams, useNavigation } from "react-router";
import { askAi } from "../../lib/ai/askAi";
import { buildAISearchPrompt } from "../../lib/ai/prompts";
import { searchManga } from "../../lib/api";
import MangaCard from "../../components/common/MangaCard";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import Empty from "../../components/ui/Empty";

export default function AISearch() {

    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const query = searchParams.get("q") || "";
    const loading = navigation.state === "loading" || navigation.state === "submitting";
    const [mangas, setMangas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!query) {
            setError("No search query provided.");
            return;
        }

        const fetchAISuggestions = async () => {
            try {
                const prompt = buildAISearchPrompt(query);
                const aiResponse = await askAi(prompt);
                let titles = [];
                
                try {
                    titles = JSON.parse(aiResponse);
                    if (!Array.isArray(titles)) throw new Error();
                } catch {
                    titles = aiResponse.split(/\n|,/).map(s => s.trim().replace(/[\[\]"']/g, '')).filter(Boolean);
                }

                const uniqueTitles = [...new Map(titles.map(t => [t.toLowerCase(), t])).values()];
                const finalTitles = uniqueTitles.slice(0, 16);

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
            }
        };

        fetchAISuggestions();

    }, [query]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading text="AI is finding best matches..." /></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><Error message={error} /></div>;
    if (!loading && mangas.length === 0) return <div className="min-h-screen flex items-center justify-center"><Empty message="No manga found for your description." /></div>;

    return (

        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white py-8 px-4">
            
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-6">
                    
                    <h1 className="text-2xl font-bold mt-2">
                        AI Recommendations for:{" "}
                        <span className="text-purple-400">"{query}"</span>
                    </h1>
                    
                    <p className="text-gray-400 text-sm mt-1">
                        Showing {mangas.length} results
                    </p>
                    
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mangas.map(manga => (
                        <MangaCard key={manga.mal_id} manga={manga} />
                    ))}
                </div>

            </div>

        </div>
    );
}
