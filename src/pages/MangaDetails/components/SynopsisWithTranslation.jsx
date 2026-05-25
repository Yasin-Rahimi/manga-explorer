import { useState } from "react";
import { FaMagic } from "react-icons/fa";
import { askClaude } from "../../../lib/claude";

// تابع ساده برای تشخیص وجود کاراکترهای فارسی در متن (اختیاری)
function isPersianText(text) {
    const persianRegex = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return persianRegex.test(text);
}

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
    const isPersian = !!translatedSynopsis && isPersianText(translatedSynopsis); // یا فقط translatedSynopsis !== null

    return (
        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 sm:p-6 backdrop-blur-md">
            <div className="flex justify-between items-start sm:items-center mb-3 flex-col sm:flex-row gap-2">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white">
                    <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                    Synopsis
                </h2>

                {/* دکمه جادویی با آیکون و متن کشویی */}
                <div className="relative group">
                    <button
                        onClick={handleTranslate}
                        disabled={isTranslating}
                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/50 hover:bg-purple-600 rounded-lg transition disabled:opacity-50 text-sm font-medium"
                    >
                        <FaMagic className={`w-4 h-4 ${isTranslating ? "animate-spin" : ""}`} />
                        <span className="hidden sm:inline">
                            {isTranslating ? "Translating..." : "Translate"}
                        </span>
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-gray-700 z-10">
                        Translate to Persian
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            </div>

            <p
                className={`whitespace-pre-line text-sm sm:text-base leading-relaxed font-light wrap-break-word ${
                    isPersian ? "text-right font-vazir" : "text-gray-300"
                }`}
                dir={isPersian ? "rtl" : "ltr"}
                lang={isPersian ? "fa" : "en"}
            >
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