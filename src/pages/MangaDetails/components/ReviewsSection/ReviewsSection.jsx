// src/pages/MangaDetails/components/ReviewsSection/ReviewsSection.jsx
import { useState } from "react";
import { askAi } from "../../../../lib/ai/askAi";
import ReviewHeader from "./ReviewHeader";
import AISummary from "./AISummary";
import ReviewList from "./ReviewList";

export default function ReviewsSection({ mangaTitle, reviews }) {
    const [summary, setSummary] = useState(null);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [summaryError, setSummaryError] = useState(null);
    const [expandedComments, setExpandedComments] = useState({});
    const [showSummary, setShowSummary] = useState(false); // جدید

    if (!reviews || reviews.length === 0) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-gray-400">
                No user reviews available.
            </div>
        );
    }

    const toggleExpand = (index) => {
        setExpandedComments(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleSummarize = async () => {
        if (loadingSummary) return;
        setLoadingSummary(true);
        setSummaryError(null);
        try {
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
            setShowSummary(true); // بعد از تولید، خلاصه نشان داده شود
        } catch (err) {
            console.error(err);
            setSummaryError("Failed to summarize reviews. Please try again.");
        } finally {
            setLoadingSummary(false);
        }
    };

    const handleToggleSummary = () => {
        setShowSummary(prev => !prev);
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <ReviewHeader 
                onSummarize={handleSummarize} 
                isLoading={loadingSummary}
                hasSummary={!!summary}
                showSummary={showSummary}
                onToggleSummary={handleToggleSummary}
            />
            
            {showSummary && (
                <AISummary summary={summary} error={summaryError} />
            )}

            <ReviewList 
                reviews={reviews.slice(0, 3)} 
                expandedComments={expandedComments} 
                onToggleExpand={toggleExpand} 
            />
        </div>
    );
}