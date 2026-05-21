import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MangaDetails() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Header */}
            <Header />

            {/* Content */}
            <div className="p-10">

                {/* Manga ID display */}
                <h1 className="text-3xl font-bold">
                    Manga Details
                </h1>

                <p className="mt-4 text-gray-400">
                    Manga ID: {id}
                </p>

                {/* Placeholder for API data */}
                <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                    More details will be loaded from Jikan API
                </div>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}