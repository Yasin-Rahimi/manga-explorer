import { useState } from "react";
import { useLoaderData } from "react-router";
import { askClaude } from "../../lib/claude";
import MangaBackground from "./components/MangaBackground";
import MangaCover from "./components/MangaCover";
import MangaTitleSection from "./components/MangaTitleSection";
import MangaStatsCards from "./components/MangaStatsCards";
import MangaGenres from "./components/MangaGenres";
import MangaMetaPanel from "./components/MangaMetaPanel";
import MangaSynopsis from "./components/MangaSynopsis";
import MangaDetailsNotFound from "./components/MangaDetailsNotFound";

export default function MangaDetails() {
    const { manga } = useLoaderData();
    const [translatedSynopsis, setTranslatedSynopsis] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationError, setTranslationError] = useState(null);

    if (!manga) {
        return <MangaDetailsNotFound />;
    }

    const coverImageUrl = manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url;
    const authorName = manga.authors?.[0]?.name;
    const publishedString = manga.published?.string;
    const originalSynopsis = manga.synopsis || "No description available.";

    const handleTranslate = async () => {
        setIsTranslating(true);
        setTranslationError(null);
        try {
            const translated = await askClaude(originalSynopsis);
            setTranslatedSynopsis(translated);
        } catch (err) {
            setTranslationError("Failed to translate. Please try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    const displaySynopsis = translatedSynopsis || originalSynopsis;

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-gray-100 flex flex-col selection:bg-purple-600 selection:text-white">
            <MangaBackground imageUrl={coverImageUrl} />
            <main className="relative z-10 grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <div className="mt-2 sm:mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                        <MangaCover imageUrl={coverImageUrl} title={manga.title} status={manga.status} />
                    </div>
                    <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6 min-w-0">
                        <MangaTitleSection title={manga.title} titleJapanese={manga.title_japanese} />
                        <MangaStatsCards score={manga.score} rank={manga.rank} popularity={manga.popularity} />
                        <MangaGenres genres={manga.genres} />
                        <MangaMetaPanel
                            chapters={manga.chapters}
                            volumes={manga.volumes}
                            publishedString={publishedString}
                            authorName={authorName}
                        />
                        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 sm:p-6 backdrop-blur-md">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white">
                                    <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                                    Synopsis
                                </h2>
                                <button
                                    onClick={handleTranslate}
                                    disabled={isTranslating}
                                    className="px-3 py-1 text-sm bg-purple-600/50 hover:bg-purple-600 rounded-lg transition disabled:opacity-50"
                                >
                                    {isTranslating ? "Translating..." : "Translate to Persian"}
                                </button>
                            </div>
                            <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed font-light text-gray-300 wrap-break-word">
                                {displaySynopsis}
                            </p>
                            {translationError && (
                                <p className="text-red-400 text-sm mt-2">{translationError}</p>
                            )}
                            {translatedSynopsis && (
                                <p className="text-xs text-gray-400 mt-4 border-t border-white/10 pt-2">
                                    * Translated from original text.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}