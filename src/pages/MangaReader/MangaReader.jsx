import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { fetchChapters, fetchChapterPages } from "../../lib/mangaReaderApi";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function MangaReader() {
  const { mangaId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [pages, setPages] = useState([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [loadingPages, setLoadingPages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchChapters(mangaId);
        setChapters(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingChapters(false);
      }
    })();
  }, [mangaId]);

  useEffect(() => {
    if (!selectedChapter) return;
    (async () => {
      setLoadingPages(true);
      try {
        const data = await fetchChapterPages(selectedChapter.id);
        setPages(data.pages);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingPages(false);
      }
    })();
  }, [selectedChapter]);

  const currentIndex = selectedChapter ? chapters.findIndex(ch => ch.id === selectedChapter.id) : -1;

  const goPrev = () => {
    if (currentIndex > 0) {
      setSelectedChapter(chapters[currentIndex - 1]);
      setPages([]);
    }
  };
  const goNext = () => {
    if (currentIndex < chapters.length - 1) {
      setSelectedChapter(chapters[currentIndex + 1]);
      setPages([]);
    }
  };

  if (loadingChapters) return <Loading text="Loading chapters..." />;
  if (error && !selectedChapter) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 shrink-0">
          <Link to={`/manga/${mangaId}`} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4">
            <FaArrowLeft /> Back to manga
          </Link>
          <h2 className="text-xl font-bold mb-4">Chapters</h2>
          <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
            {chapters.map(chapter => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                  selectedChapter?.id === chapter.id
                    ? "bg-purple-600/80 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-gray-300"
                }`}
              >
                <div className="font-medium">{chapter.title}</div>
                {chapter.scanlationGroup && (
                  <div className="text-xs text-gray-400">{chapter.scanlationGroup}</div>
                )}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          {!selectedChapter ? (
            <div className="flex flex-col items-center justify-center h-96 text-gray-400">
              <p>Select a chapter to start reading</p>
            </div>
          ) : loadingPages ? (
            <Loading text="Loading pages..." />
          ) : error ? (
            <Error message={error} />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h1 className="text-2xl font-bold">{selectedChapter.title}</h1>
                <div className="flex gap-2">
                  <button onClick={goPrev} disabled={currentIndex <= 0}
                    className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition flex items-center gap-2">
                    <FaArrowLeft /> Prev
                  </button>
                  <button onClick={goNext} disabled={currentIndex >= chapters.length - 1}
                    className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition flex items-center gap-2">
                    Next <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-w-3xl mx-auto">
                {pages.map((url, idx) => (
                  <img key={idx} src={url} alt={`Page ${idx + 1}`}
                    className="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={goPrev} disabled={currentIndex <= 0}
                  className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition flex items-center gap-2">
                  <FaArrowLeft /> Previous Chapter
                </button>
                <button onClick={goNext} disabled={currentIndex >= chapters.length - 1}
                  className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition flex items-center gap-2">
                  Next Chapter <FaArrowRight />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
