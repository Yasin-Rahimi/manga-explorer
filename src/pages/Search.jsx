import { useSearchParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Search() {
    const [params] = useSearchParams();
    const query = params.get("q");

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Header */}
            <Header />

            {/* Search result title */}
            <div className="p-10">
                <h1 className="text-2xl font-bold">
                    Search Results for: {query}
                </h1>

                {/* Placeholder content */}
                <p className="mt-4 text-gray-400">
                    (API integration will be added later using Jikan API)
                </p>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}