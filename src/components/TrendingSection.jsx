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
    <section className="px-10">

      {/* Title */}
      {trending.length > 0 && (
        <h2 id="trending" className="text-2xl font-bold mb-6">
          Top Trending Mangas
        </h2>
      )}

      {/* Grid */}
      <div className="grid grid-cols-4 gap-6">
        {trending.map((manga, index) => (
          <MangaCard key={index} manga={manga} />
        ))}
      </div>

      {/* Pagination */}
      {trending.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          lastPage={lastPage}
        />
      )}

      {/* States */}
      {loading && <Loading text="Loading trending manga..." />}

      {error && (
        <Error
          message={error}
          onRetry={() => setPage(1)}
        />
      )}

      {!loading && !error && trending.length === 0 && (
        <Empty message="No trending manga found." />
      )}
    </section>
  );
}