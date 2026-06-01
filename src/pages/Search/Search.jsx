import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { searchManga } from "../../lib/api";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import Empty from "../../components/ui/Empty";
import SearchHeader from "./components/SearchHeader";
import SearchResultsGrid from "./components/SearchResultsGrid";

/**
 * Search page – fetches results internally to display a loading spinner.
 */
export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sort, setSort] = useState("");

    useEffect(() => {
        // If no query, show empty state immediately
        if (!query) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        searchManga(query)
            .then((data) => {
                setResults(data?.data ?? []);
            })
            .catch(() => {
                setError("Failed to search manga.");
                setResults([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    const handleChangeSort = (value) => {
        if (!value) return;
        setSort(value);
    };

    // Full‑screen spinner while loading
    if (loading) {
        return (
            <div className="h-fit flex items-center justify-center">
                <Loading text="Searching..." />
            </div>
        );
    }

    // Full‑screen error
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Error message={error} />
            </div>
        );
    }

    // Empty state when query was provided but no results
    if (!loading && results.length === 0 && query) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Empty message={`No manga found for "${query}".`} />
            </div>
        );
    }

    // Empty state when no query entered
    if (!loading && results.length === 0 && !query) {
        return (
            <div className="h-fit flex items-center justify-center">
                <Empty message="Enter a search term to find manga." />
            </div>
        );
    }

    // Normal results view
    return (
        <div className="h-fit bg-linear-to-br from-black via-purple-950 to-black text-white flex flex-col">
            <main className="flex-1 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10">
                <SearchHeader
                    query={query}
                    loading={false}  // already handled
                    onChangeSort={handleChangeSort}
                />
                <SearchResultsGrid results={results} sort={sort} />
            </main>
        </div>
    );
}