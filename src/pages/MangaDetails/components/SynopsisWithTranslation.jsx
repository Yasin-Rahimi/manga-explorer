import { useState } from "react";
import { FaMagic } from "react-icons/fa";
import { askClaude } from "../../../lib/claude";

export default function SynopsisWithTranslation({ originalSynopsis }) {
    const [translatedSynopsis, setTranslatedSynopsis] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationError, setTranslationError] = useState(null);

    const handleTranslate = async () => {
        setIsTranslating(true);
        setTranslationError(null);
        try {
            const translated = await askClaude(originalSynopsis);
            setTranslatedSynopsis(translated);
        } catch (err) {
            setTranslationError("Failed to translate. Please try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    const displaySynopsis = translatedSynopsis || originalSynopsis;

    return (
        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 sm:p-6 backdrop-blur-md">
            <div className="flex justify-between items-start sm:items-center mb-3 flex-col sm:flex-row gap-2">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white">
                    <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                    Synopsis
                </h2>

                {/* دکمه با آیکون و متن کشویی */}
                <div className="relative group">
                    <button
                        onClick={handleTranslate}
                        disabled={isTranslating}
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-purple-600/50 hover:bg-purple-600 rounded-lg transition disabled:opacity-50 text-sm font-medium"
                    >
                        <FaMagic className={`w-4 h-4 ${isTranslating ? "animate-spin" : ""}`} />
                        {/* متن برای صفحه‌های بزرگ که درون دکمه نشان داده می‌شود (اختیاری) */}
                        <span className="hidden sm:inline">
                            {isTranslating ? "Translating..." : "Translate"}
                        </span>
                    </button>
                </div>
            </div>

            <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed font-light text-gray-300 wrap-break-word">
                {displaySynopsis}
            </p>

            {translationError && (
                <p className="text-red-400 text-sm mt-2">{translationError}</p>
            )}
            {translatedSynopsis && (
                <p className="text-xs text-gray-400 mt-4 border-t border-white/10 pt-2">
                    * Translated from original text.
                </p>
            )}
        </div>
    );
}