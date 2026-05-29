// src/pages/MangaDetails/components/ReviewsSummarizer.jsx
import { useState } from "react";
import { FaComment, FaThumbsUp, FaThumbsDown, FaSpinner, FaCommentDots, FaRobot } from "react-icons/fa";
import { askAi } from "../../../lib/ai/askAi";
import { buildReviewSummaryPrompt } from "../../../lib/ai/prompts";

export default function ReviewsSummarizer({ mangaTitle, reviews }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSummarize = async () => {
        if (!reviews || reviews.length === 0) {
            setError("No user reviews found for this manga.");
            return;
        }

        setLoading(true);
        setError(null);
        setSummary(null);

        try {
            const reviewsText = reviews
                .slice(0, 10)
                .map((review, idx) => {
                    const content = review.review || review.comments || "";
                    return `Review ${idx + 1}: ${content.substring(0, 500)}`;
                })
                .join("\n\n");

            const prompt = buildReviewSummaryPrompt(mangaTitle, reviewsText);
            const aiResponse = await askAi(prompt);
            setSummary(aiResponse);
        } catch (err) {
            console.error(err);
            setError("Failed to summarize reviews. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-300 flex items-center gap-2 flex-wrap">
                    <FaComment className="text-purple-400 w-4 h-4" />
                    <span className="font-medium">AI analyzes user reviews</span>
                    <span className="text-gray-400">— extracts pros & cons for you.</span>
                </div>
                <button
                    onClick={handleSummarize}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/70 hover:bg-purple-600 rounded-lg transition disabled:opacity-50 text-white font-medium text-sm sm:w-auto w-full"
                >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
                    <span>{loading ? "Analyzing reviews..." : "Summarize with AI"}</span>
                </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            {summary && (
                <div className="mt-4 text-sm text-gray-200 space-y-3 border-t border-white/10 pt-3">
                    <div className="flex items-start gap-2">
                        <FaThumbsUp className="text-green-400 mt-0.5 shrink-0" />
                        <div className="whitespace-pre-wrap">{extractPositive(summary)}</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaThumbsDown className="text-red-400 mt-0.5 shrink-0" />
                        <div className="whitespace-pre-wrap">{extractNegative(summary)}</div>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                        <FaCommentDots /> Based on user reviews analyzed by AI
                    </div>
                </div>
            )}
        </div>
    );
}

function extractPositive(summary) {
    const match = summary.match(/\*\*Positive Points:\*\*([\s\S]*?)\*\*Negative Points:\*\*/i);
    return match?.[1]?.trim() || "No positive points extracted.";
}

function extractNegative(summary) {
    const match = summary.match(/\*\*Negative Points:\*\*([\s\S]*)/i);
    return match?.[1]?.trim() || "No negative points extracted.";
}
