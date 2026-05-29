// src/pages/MangaDetails/components/ReviewsSection/ReviewItem.jsx
import { FaStar, FaUser, FaCalendarAlt } from "react-icons/fa";

export default function ReviewItem({ review, index, isExpanded, onToggleExpand }) {
    const fullText = review.review || review.comments || "No content";
    const shortText = fullText.length > 200 ? fullText.substring(0, 200) + "..." : fullText;

    return (
        <div className="border-b border-white/10 pb-3 last:border-0">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaUser className="text-purple-400" />
                    <span className="font-medium">{review.user?.username || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaCalendarAlt />
                    <span>{review.date ? new Date(review.date).toLocaleDateString() : 'Unknown date'}</span>
                </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
                {isExpanded ? fullText : shortText}
            </p>
            {fullText.length > 200 && (
                <button
                    onClick={() => onToggleExpand(index)}
                    className="cursor-pointer text-purple-400 text-xs mt-1 hover:underline"
                >
                    {isExpanded ? "Show less" : "Read more"}
                </button>
            )}
        </div>
    );
}