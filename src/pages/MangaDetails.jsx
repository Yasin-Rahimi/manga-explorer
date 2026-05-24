import { useLoaderData } from "react-router";
import { getMangaById } from "../lib/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MangaBackground from "../components/manga/MangaBackground";
import MangaCover from "../components/manga/MangaCover";
import MangaTitleSection from "../components/manga/MangaTitleSection";
import MangaStatsCards from "../components/manga/MangaStatsCards";
import MangaGenres from "../components/manga/MangaGenres";
import MangaMetaPanel from "../components/manga/MangaMetaPanel";
import MangaSynopsis from "../components/manga/MangaSynopsis";
import MangaDetailsNotFound from "../components/manga/MangaDetailsNotFound";

export async function mangaDetailsLoader({ params }) {
    try {
        const data = await getMangaById(params.id);
        return { manga: data?.data ?? null };
    } catch {
        return { manga: null };
    }
}

export default function MangaDetails() {
    const { manga } = useLoaderData();

    if (!manga) {
        return <MangaDetailsNotFound />;
    }

    const coverImageUrl = manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url;
    const authorName = manga.authors?.[0]?.name;
    const publishedString = manga.published?.string;

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-gray-100 flex flex-col selection:bg-purple-600 selection:text-white">
            <MangaBackground imageUrl={coverImageUrl} />
            <Header />
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
                        <MangaSynopsis synopsis={manga.synopsis} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}