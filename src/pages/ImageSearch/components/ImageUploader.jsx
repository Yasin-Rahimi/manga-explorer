// src/pages/ImageSearch/components/ImageUploader.jsx
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaInfoCircle, FaRobot, FaBookOpen, FaPlay } from "react-icons/fa";
import { identifyMangaFromImage } from "../../../lib/ai/gptVision";
import { searchAnimeScene } from "../../../lib/traceMoe";
import { getAnimeById } from "../../../lib/anilist";
import { findMangaByTitle } from "../../../lib/animeToManga";
import ImageDropzone from "./ImageDropzone";
import ImageUploadControls from "./ImageUploadControls";
import ErrorMessage from "./ErrorMessage";
import ResultDisplay from "./ResultDisplay";
import AnimeSceneResult from "./AnimeSceneResult";

const STORAGE_KEY = "lastImageSearchResult";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    primaryGuess: { title: "", found: false, url: null },
    alternativeGuesses: [],
  });
  const [animeResult, setAnimeResult] = useState(null);
  const [animeDetails, setAnimeDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState({});
  const [mangaLinks, setMangaLinks] = useState({});
  const [error, setError] = useState("");
  const [searchMode, setSearchMode] = useState("manga");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (searchMode === "manga") {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setResult(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      setAnimeResult(null);
    }
  }, [searchMode]);

  useEffect(() => {
    if (searchMode === "manga" && result.primaryGuess?.title) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [result, searchMode]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult({
      primaryGuess: { title: "", found: false, url: null },
      alternativeGuesses: [],
    });
    setAnimeResult(null);
    setAnimeDetails({});
    setLoadingDetails({});
    setMangaLinks({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult({
      primaryGuess: { title: "", found: false, url: null },
      alternativeGuesses: [],
    });
    setAnimeResult(null);
    setAnimeDetails({});
    setLoadingDetails({});
    setMangaLinks({});
    setError("");
    sessionStorage.removeItem(STORAGE_KEY);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleIdentify = async () => {
    if (!selectedFile) {
      setError("No image selected.");
      return;
    }

    setLoading(true);
    setError("");

    if (searchMode === "manga") {
      setResult({
        primaryGuess: { title: "", found: false, url: null },
        alternativeGuesses: [],
      });
      setAnimeResult(null);
      setAnimeDetails({});
      setLoadingDetails({});
      setMangaLinks({});

      try {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = async () => {
          const base64String = reader.result.split(",")[1];
          const mimeType = selectedFile.type;
          const answer = await identifyMangaFromImage(base64String, mimeType);
          setResult(answer);
          setLoading(false);
        };
        reader.onerror = () => {
          setError("Failed to read image file.");
          setLoading(false);
        };
      } catch (err) {
        setError(err.message || "Something went wrong.");
        setLoading(false);
      }
    } else {
      setResult({
        primaryGuess: { title: "", found: false, url: null },
        alternativeGuesses: [],
      });
      setAnimeResult(null);
      setAnimeDetails({});
      setLoadingDetails({});
      setMangaLinks({});

      try {
        const data = await searchAnimeScene(selectedFile);
        if (data.error) {
          setError(data.error);
        } else {
          const matches = data.result || [];
          setAnimeResult(matches);

          const ids = [...new Set(matches.slice(0, 3).map(m => m.anilist).filter(Boolean))];
          const newLoadingDetails = {};
          ids.forEach(id => { newLoadingDetails[id] = true; });
          setLoadingDetails(newLoadingDetails);

          const detailsMap = {};
          await Promise.all(ids.map(async (id) => {
            try {
              const details = await getAnimeById(id);
              detailsMap[id] = details;
            } catch (err) {
              console.error("Failed to fetch AniList data for", id, err);
            } finally {
              setLoadingDetails(prev => ({ ...prev, [id]: false }));
            }
          }));
          setAnimeDetails(detailsMap);

          const linksMap = {};
          await Promise.all(ids.map(async (id) => {
            const detail = detailsMap[id];
            if (detail) {
              const title = detail.title?.english || detail.title?.romaji;
              if (title) {
                const mangaLink = await findMangaByTitle(title);
                linksMap[id] = mangaLink;
              } else {
                linksMap[id] = { found: false };
              }
            } else {
              linksMap[id] = { found: false };
            }
          }));
          setMangaLinks(linksMap);
        }
      } catch (err) {
        setError(err.message || "Failed to search anime scene.");
      } finally {
        setLoading(false);
      }
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const identifyLabel = searchMode === "anime" ? "Identify Anime" : "Identify Manga";

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-5 sm:px-4 sm:py-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-1 mb-3 sm:mb-2">
        <FaSearch className="text-purple-400 text-base sm:text-2xl" />
        <h2 className="text-base sm:text-2xl font-bold text-white">
          Image Search
        </h2>
      </div>
      <p className="text-gray-300 text-[11px] sm:text-sm mb-5 sm:mb-6 flex items-start gap-1">
        <FaInfoCircle className="text-gray-400 shrink-0 mt-0.5" />
        <span>
          Upload a manga panel, cover, or anime screenshot. AI will identify
          the manga, and for anime we'll find the exact scene.
        </span>
      </p>

      {/* دکمه‌های انتخاب حالت - کوچک‌تر در موبایل */}
      <div className="flex gap-2 sm:gap-3 mb-4">
        <button
          onClick={() => setSearchMode("manga")}
          className={`cursor-pointer flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            searchMode === "manga"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <FaBookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Manga Search
        </button>
        <button
          onClick={() => setSearchMode("anime")}
          className={`cursor-pointer flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            searchMode === "anime"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <FaPlay className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Anime Scene Search
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <ImageDropzone
        previewUrl={previewUrl}
        onClear={clearImage}
        onClick={triggerFileInput}
      />

      <ImageUploadControls
        onIdentify={handleIdentify}
        onClear={clearImage}
        hasImage={!!selectedFile}
        isLoading={loading}
        label={identifyLabel}
      />

      <ErrorMessage message={error} />

      {searchMode === "manga" && (
        <ResultDisplay
          primaryGuess={result.primaryGuess}
          alternativeGuesses={result.alternativeGuesses}
        />
      )}

      {searchMode === "anime" && animeResult && (
        <AnimeSceneResult
          result={animeResult}
          animeDetails={animeDetails}
          loadingDetails={loadingDetails}
          mangaLinks={mangaLinks}
        />
      )}

      <p className="text-[10px] sm:text-xs text-gray-500 mt-5 sm:mt-6 text-left flex items-start justify-center gap-2">
        {searchMode === "manga" ? (
          <>
            <FaRobot className="text-purple-400" />
            Powered by GPT-4o Vision. Results may not be 100% accurate.
          </>
        ) : (
          <>
            <FaSearch className="text-purple-400" />
            Scene search by trace.moe — anime info from AniList
          </>
        )}
      </p>
    </div>
  );
}
