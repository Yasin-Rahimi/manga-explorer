import { useState } from "react";
import { askAi } from "../../../../lib/ai/askAi";
import { buildReviewSummaryPrompt } from "../../../../lib/ai/prompts";
import ReviewHeader from "./ReviewHeader";
import AISummary from "./AISummary";
import ReviewList from "./ReviewList";

export default function ReviewsSection({ mangaTitle, reviews }) {

    const [summary, setSummary] = useState(null);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [summaryError, setSummaryError] = useState(null);
    const [expandedComments, setExpandedComments] = useState({});
    const [showSummary, setShowSummary] = useState(false);

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

            const prompt = buildReviewSummaryPrompt(mangaTitle, reviewsText);
            const aiResponse = await askAi(prompt);
            setSummary(aiResponse);
            setShowSummary(true);
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
