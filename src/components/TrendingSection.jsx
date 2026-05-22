import MangaCard from "./MangaCard";
import Pagination from "./Pagination";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import Empty from "./ui/Empty";

export default function TrendingSection({
    trending,
    page,
    setPage,
    lastPage,
    loading,
    error
}) {
    return (
        <section
            className="
                w-full
                px-4 sm:px-6 md:px-8 lg:px-10
                py-4 sm:py-6
                overflow-hidden
            "
        >

            {/* Title */}
            {trending.length > 0 && (
                <h2
                    id="trending"
                    className="
                        mb-5 sm:mb-6
                        text-xl sm:text-2xl md:text-3xl
                        font-bold
                        leading-tight
                        wrap-break-word
                    "
                >
                    Top Trending Mangas
                </h2>
            )}

            {/* Grid */}
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-4 sm:gap-5 lg:gap-6
                    w-full
                "
            >
                {trending.map((manga, index) => (
                    <div key={index} className="min-w-0">
                        <MangaCard manga={manga} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {trending.length > 0 && (
                <div className="mt-8 sm:mt-10">
                    <Pagination
                        page={page}
                        setPage={setPage}
                        lastPage={lastPage}
                    />
                </div>
            )}

            {/* States */}
            {loading && (
                <div className="mt-8 sm:mt-10">
                    <Loading text="Loading trending manga..." />
                </div>
            )}

            {error && (
                <div className="mt-8 sm:mt-10">
                    <Error
                        message={error}
                        onRetry={() => setPage(1)}
                    />
                </div>
            )}

            {!loading && !error && trending.length === 0 && (
                <div className="mt-8 sm:mt-10">
                    <Empty message="No trending manga found." />
                </div>
            )}
        </section>
    );
}