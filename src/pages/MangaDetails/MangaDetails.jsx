import { useLoaderData } from "react-router";
import MangaBackground from "./components/MangaBackground";
import MangaCover from "./components/MangaCover";
import MangaTitleSection from "./components/MangaTitleSection";
import MangaStatsCards from "./components/MangaStatsCards";
import MangaGenres from "./components/MangaGenres";
import MangaMetaPanel from "./components/MangaMetaPanel";
import MangaDetailsNotFound from "./components/MangaDetailsNotFound";
import SynopsisWithTranslation from "./components/SynopsisWithTranslation";
import ReviewsSummarizer from "./components/ReviewsSummarizer";


export default function MangaDetails() {
    const { manga } = useLoaderData();

    if (!manga) {
        return <MangaDetailsNotFound />;
    }

    const coverImageUrl = manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url;
    const authorName = manga.authors?.[0]?.name;
    const publishedString = manga.published?.string;
    const originalSynopsis = manga.synopsis || "No description available.";

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-gray-100 flex flex-col selection:bg-purple-600 selection:text-white">
            <MangaBackground imageUrl={coverImageUrl} />
            <main className="relative z-10 grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <div className="mt-2 sm:mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                        <MangaCover
                            imageUrl={coverImageUrl}
                            title={manga.title}
                            status={manga.status}
                        />
                    </div>
                    <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6 min-w-0">
                        <MangaTitleSection
                            title={manga.title}
                            titleJapanese={manga.title_japanese}
                        />
                        <MangaStatsCards
                            score={manga.score}
                            rank={manga.rank}
                            popularity={manga.popularity}
                        />
                        <MangaGenres genres={manga.genres} />
                        <MangaMetaPanel
                            chapters={manga.chapters}
                            volumes={manga.volumes}
                            publishedString={publishedString}
                            authorName={authorName}
                        />
                        <SynopsisWithTranslation originalSynopsis={originalSynopsis} />
                        <ReviewsSummarizer mangaId={manga.mal_id} mangaTitle={manga.title} />
                    </div>
                </div>
            </main>
        </div>
    );
}