import { useMemo, useState } from "react";
import { useLoaderData, useNavigation } from "react-router";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import Empty from "../../components/ui/Empty";
import SearchHeader from "./components/SearchHeader";
import SearchResultsGrid from "./components/SearchResultsGrid";

export default function Search() {
    const { query, results, error } = useLoaderData();
    const navigation = useNavigation();
    const [sort, setSort] = useState("");

    const loading = navigation.state === "loading" || navigation.state === "submitting";

    const sortResult = useMemo(() => {
        if (!sort) return [];
        const list = [...results];
        if (sort === "rate") {
            return list.sort((m1, m2) => (m2.score ?? 0) - (m1.score ?? 0));
        }
        return list.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
    }, [results, sort]);

    const handleChangeSort = (value) => {
        if (!value) return;
        setSort(value);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white flex flex-col">
            <main className="flex-1 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10">
                <SearchHeader
                    query={query}
                    loading={loading}
                    onChangeSort={handleChangeSort}
                />

                {!loading && !error && results.length > 0 && (
                    <SearchResultsGrid results={results} sort={sort} />
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

                {!loading && !error && results.length === 0 && query && (
                    <div className="py-16 sm:py-20">
                        <Empty message={`No manga found for "${query}".`} />
                    </div>
                )}

                {!loading && !error && !query && (
                    <div className="py-16 sm:py-20">
                        <Empty message="Enter a search term to find manga." />
                    </div>
                )}
            </main>
        </div>
    );
}