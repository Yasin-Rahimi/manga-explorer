import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { searchManga } from "../lib/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Empty from "../components/ui/Empty";
import SearchHeader from "../components/search/SearchHeader";
import SearchResultsGrid from "../components/search/SearchResultsGrid";

const ERROR_MESSAGE = "Failed to search manga.";

export default function Search() {
    const [params] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sort, setSort] = useState("");
    const [sortResult, setSortResult] = useState([]);

    const query = params.get("q") || "";

    useEffect(() => {
        if (!query) return;

        let ignore = false;

        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await searchManga(query);
                if (!ignore) {
                    setResults(data?.data ?? []);
                }
            } catch (err) {
                if (!ignore) {
                    setError(ERROR_MESSAGE);
                    setResults([]);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchResults();

        return () => {
            ignore = true;
        };
    }, [query]);

    const handleChangeSort = (value) => {
        if (!value) return;

        setSort(value);

        let filteredResult;
        if (value === "rate") {
            filteredResult = [...results].sort((m1, m2) => m2.score - m1.score);
        } else {
            filteredResult = [...results].sort((a, b) => a.title.localeCompare(b.title));
        }
        setSortResult(filteredResult);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10">
                <SearchHeader
                    query={query}
                    loading={loading}
                    onChangeSort={handleChangeSort}
                />

                {!loading && !error && results.length > 0 && (
                    <SearchResultsGrid results={results} sortResult={sortResult} />
                )}

                {loading && (
                    <div className="py-16 sm:py-20">
                        <Loading text="Searching..." />
                    </div>
                )}

                {error && (
                    <div className="py-16 sm:py-20">
                        <Error message={error} />
                    </div>
                )}

                {!loading && !error && results.length === 0 && (
                    <div className="py-16 sm:py-20">
                        <Empty message="No manga found for this search." />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}