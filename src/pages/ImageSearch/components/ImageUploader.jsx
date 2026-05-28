// src/pages/ImageSearch/components/ImageUploader.jsx
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaInfoCircle, FaRobot } from "react-icons/fa";
import { identifyMangaFromImage } from "../../../lib/ai/gptVision";
import ImageDropzone from "./ImageDropzone";
import ImageUploadControls from "./ImageUploadControls";
import ErrorMessage from "./ErrorMessage";
import ResultDisplay from "./ResultDisplay";

const STORAGE_KEY = "lastImageSearchResult";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    primaryGuess: { title: "", found: false, url: null },
    alternativeGuesses: [],
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (result.primaryGuess?.title) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [result]);

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
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult({
      primaryGuess: { title: "", found: false, url: null },
      alternativeGuesses: [],
    });
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
    setResult({
      primaryGuess: { title: "", found: false, url: null },
      alternativeGuesses: [],
    });

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
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <div className="w-full max-w-2xl mx-auto px-2 py-2 sm:px-4 sm:py-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-1 mb-1 sm:gap-2 sm:mb-2">
        <FaSearch className="text-purple-400 text-base sm:text-2xl" />
        <h2 className="text-base sm:text-2xl font-bold text-white">
          Search Manga by Image
        </h2>
      </div>
      <p className="text-gray-300 text-[11px] sm:text-sm mb-2 sm:mb-6 flex items-start gap-1">
        <FaInfoCircle className="text-gray-400 shrink-0 mt-0.5" />
        <span>
          Upload a manga panel or cover. AI will try to identify it and suggest
          similar ones.
        </span>
      </p>

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
      />

      <ErrorMessage message={error} />
      <ResultDisplay
        primaryGuess={result.primaryGuess}
        alternativeGuesses={result.alternativeGuesses}
      />

      <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-6 text-left flex items-start justify-center gap-2">
        <FaRobot className="text-purple-400" />
        Powered by GPT-4o Vision. Results may not be 100% accurate.
      </p>
    </div>
  );
}
