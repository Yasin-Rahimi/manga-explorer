import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TrendingSection from "../components/TrendingSection";
import { useState, useEffect } from "react";
import { getTopManga } from "../lib/api";

export default function Home() {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/search?q=${query}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getTopManga(page);

        setTrending(res.data ?? []);
        setLastPage(res.pagination?.last_visible_page ?? 1);

      } catch (err) {
        setError("Failed to load trending manga.");
        setTrending([]);

      } finally {
        setLoading(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">

      <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />

      <HeroSection mangas={trending} />

      <TrendingSection
        trending={trending}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
        loading={loading}
        error={error}
      />

      <Footer />
    </div>
  );
}