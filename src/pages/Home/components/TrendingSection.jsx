import MangaCard from "../../../components/common/MangaCard";
import Pagination from "./Pagination";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import Empty from "../../../components/ui/Empty";

export default function TrendingSection({
    trending,
    page,
    setPage,
    lastPage,
    loading,
    error
}) {
    return (
        <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 overflow-hidden">
            {trending.length > 0 && (
                <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-bold">
                    Trend Mangas
                </h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full">
                {trending.map((manga, index) => (
                    <div key={index} className="min-w-0">
                        <MangaCard manga={manga} />
                    </div>
                ))}
            </div>

            {trending.length > 0 && (
                <div className="mt-8 sm:mt-10">
                    <Pagination
                        page={page}
                        setPage={setPage}
                        lastPage={lastPage}
                    />
                </div>
            )}

            {loading && (
                <div className="mt-8 sm:mt-10">
                    <Loading text="Loading trending manga..." />
                </div>
            )}

            {error && (
                <div className="mt-8 sm:mt-10">
                    <Error message={error} />
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