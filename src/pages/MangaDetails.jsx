import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMangaById } from "../lib/api";
import BackButton from "../components/BackButton";

export default function MangaDetails() {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const data = await getMangaById(id);
            setManga(data.data);

            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Header */}
            <Header />


            {/* Content */}
            <div className="px-10">

                <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">

                    {/* Header section */}
                    <div className="flex gap-10 p-10 max-w-6xl mx-auto">

                <div className="gap-3">
                    <BackButton />
                </div>

                        {/* Cover */}
                        <img
                            src={manga.images.jpg.image_url}
                            alt={manga.title}
                            className="w-64 h-96 object-cover rounded-xl shadow-2xl hover:scale-105 transition"
                        />

                        {/* Info */}
                        <div className="flex flex-col gap-4">

                            {/* Title */}
                            <h1 className="text-4xl font-bold">
                                {manga.title ?? 'Not found'}
                            </h1>

                            <p className="text-purple-300">
                                {manga.title_japanese ?? 'Not found'}
                            </p>

                            {/* Stats */}
                            <div className="flex gap-4 text-sm text-gray-300">
                                <span>⭐ {manga.score ?? 'Not found'}</span>
                                <span>Rank {manga.rank ?? 'Not found'}</span>
                                <span>{manga.status ?? 'Not found'}</span>
                            </div>

                            {/* Genres */}
                            <div className="flex gap-2 flex-wrap">
                                {manga.genres.map((g) => (
                                    <span
                                        key={g.mal_id}
                                        className="px-3 py-1 bg-purple-700 rounded-full text-xs"
                                    >
                                        {g.name ?? 'Not found'}
                                    </span>
                                ))}
                            </div>

                            {/* Meta */}
                            <div className="text-sm text-gray-400">
                                <p>Chapters: {manga.chapters ?? 'Not found'}</p>
                                <p>Volumes: {manga.volumes ?? 'Not found'}</p>
                                <p>Published: {manga.published.string ?? 'Not found'}</p>
                                <p>Author: {manga.authors?.[0]?.name ?? 'Not found'} </p>
                            </div>
                        </div>
                    </div>

                    {/* Synopsis */}
                    <div className="max-w-4xl mx-auto px-10 py-6">
                        <h2 className="text-2xl font-bold mb-3">
                            Synopsis
                        </h2>

                        <p className="text-gray-300 leading-relaxed">
                            {manga.synopsis ? manga.synopsis : 'No descrition has been written!'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}