import { useState } from "react";
import { FaMagic } from "react-icons/fa";
import { askClaude } from "../../../lib/claude";

function isPersianText(text) {
    const persianRegex = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return persianRegex.test(text);
}

export default function SynopsisWithTranslation({ originalSynopsis }) {
    const [translatedSynopsis, setTranslatedSynopsis] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationError, setTranslationError] = useState(null);
    const [showTranslation, setShowTranslation] = useState(false);

    const handleTranslateOrToggle = async () => {
        // اگر ترجمه وجود دارد و در حال نمایش اصلی هستیم، فقط نمایش را تغییر بده
        if (translatedSynopsis && !showTranslation) {
            setShowTranslation(true);
            return;
        }
        // اگر ترجمه وجود دارد و در حال نمایش ترجمه هستیم، به اصلی برگرد
        if (translatedSynopsis && showTranslation) {
            setShowTranslation(false);
            return;
        }
        // در غیر این صورت، ترجمه را دریافت کن
        setIsTranslating(true);
        setTranslationError(null);
        try {
            const translated = await askClaude(originalSynopsis);
            setTranslatedSynopsis(translated);
            setShowTranslation(true);
        } catch (err) {
            setTranslationError("Failed to translate. Please try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    const displaySynopsis = (showTranslation && translatedSynopsis) || originalSynopsis;
    const isPersian = showTranslation && translatedSynopsis && isPersianText(translatedSynopsis);

    let buttonText = "Translate";
    if (isTranslating) {
        buttonText = "Translating...";
    } else if (translatedSynopsis && showTranslation) {
        buttonText = "Show Original";
    } else if (translatedSynopsis && !showTranslation) {
        buttonText = "Show Translation";
    }

    return (
        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 sm:p-6 backdrop-blur-md">
            <div className="flex flex-row justify-between items-start sm:items-center mb-3 sm:flex-row gap-2">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white">
                    <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                    Synopsis
                </h2>
                <div className="relative group">
                    <button
                        onClick={handleTranslateOrToggle}
                        disabled={isTranslating}
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-purple-600/50 hover:bg-purple-600 rounded-lg transition disabled:opacity-50 text-sm font-medium"
                    >
                        <FaMagic className={`w-4 h-4 ${isTranslating ? "animate-spin" : ""}`} />
                        <span className="hidden sm:inline">{buttonText}</span>
                    </button>
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
                    * {showTranslation ? "Translated from original text." : "Original text."}
                </p>
            )}
        </div>
    );
}