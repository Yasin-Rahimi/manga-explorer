import { useState } from "react";
import { FaComment, FaThumbsUp, FaThumbsDown, FaSpinner, FaCommentDots, FaRobot } from "react-icons/fa";
import { getMangaReviews } from "../../../lib/api";
import { askAi  } from "../../../lib/askAi";

export default function ReviewsSummarizer({ mangaId, mangaTitle }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSummarize = async () => {
        setLoading(true);
        setError(null);
        setSummary(null);

        try {
            const reviewsData = await getMangaReviews(mangaId);
            const reviews = reviewsData.data || [];

            if (!reviews.length) {
                setError("No user reviews found for this manga.");
                setLoading(false);
                return;
            }

            const reviewsText = reviews
                .slice(0, 10)
                .map((review, idx) => {
                    const content = review.review || review.comments || "";
                    return `Review ${idx + 1}: ${content.substring(0, 500)}`;
                })
                .join("\n\n");

            const prompt = `
                    You are a helpful assistant. Below are user reviews for the manga titled "${mangaTitle}".

                    ${reviewsText}

                    Please analyze the reviews and provide a concise summary in English, strictly in the following format:

                    **Positive Points:**
                    - point 1
                    - point 2
                    ...

                    **Negative Points:**
                    - point 1
                    - point 2
                    ...

                    If there are not enough points for one side, write "None". Keep each point short (one sentence max). Do not add any extra commentary.
                    `;

            const aiResponse = await askAi(prompt, { temperature: 0.3, max_tokens: 400 });
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
            {/* ردیف اول: توضیح یک خطی (سمت چپ) و دکمه (سمت راست) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-300 flex items-center gap-2 flex-wrap">
                    <FaComment className="text-purple-400 w-4 h-4" />
                    <span className="font-medium">AI analyzes user reviews</span>
                    <span className="text-gray-400">— extracts pros & cons for you.</span>
                </div>
                <button
                    onClick={handleSummarize}
                    disabled={loading}
                    className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/70 hover:bg-purple-600 rounded-lg transition disabled:opacity-50 text-white font-medium text-sm sm:w-auto w-full"
                >
                    {loading ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <FaRobot />
                    )}
                    <span>{loading ? "Analyzing reviews..." : "Summarize with AI"}</span>
                </button>
            </div>

            {/* نمایش خطا */}
            {error && (
                <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

            {/* نمایش خلاصه نکات مثبت و منفی */}
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
    if (match && match[1]) {
        return match[1].trim();
    }
    return "No positive points extracted.";
}

function extractNegative(summary) {
    const match = summary.match(/\*\*Negative Points:\*\*([\s\S]*)/i);
    if (match && match[1]) {
        return match[1].trim();
    }
    return "No negative points extracted.";
}