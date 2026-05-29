// src/pages/MangaDetails/components/ReviewsSection/ReviewHeader.jsx
import { FaComments, FaRobot, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ReviewHeader({ 
    onSummarize, 
    isLoading, 
    hasSummary, 
    showSummary, 
    onToggleSummary 
}) {
    let buttonContent = null;
    let buttonAction = null;

    if (hasSummary) {
        buttonAction = onToggleSummary;
        buttonContent = (
            <>
                {showSummary ? <FaEyeSlash /> : <FaEye />}
                <span>{showSummary ? "Hide AI Summary" : "Show AI Summary"}</span>
            </>
        );
    } else {
        buttonAction = onSummarize;
        buttonContent = (
            <>
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
                <span>{isLoading ? "Analyzing..." : "Summarize with AI"}</span>
            </>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-5 rounded-full bg-purple-500"></span>
                <h3 className="text-lg font-semibold text-white">User Reviews</h3>
            </div>
            <button
                onClick={buttonAction}
                disabled={isLoading && !hasSummary}
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/70 hover:bg-purple-600 rounded-lg transition disabled:opacity-50 text-white font-medium text-sm"
            >
                {buttonContent}
            </button>
        </div>
    );
}