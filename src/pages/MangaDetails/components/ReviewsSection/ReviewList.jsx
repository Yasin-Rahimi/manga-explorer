// src/pages/MangaDetails/components/ReviewsSection/ReviewList.jsx
import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews, expandedComments, onToggleExpand }) {
    return (
        <div className="space-y-4">
            {reviews.map((review, idx) => (
                <ReviewItem
                    key={idx}
                    review={review}
                    index={idx}
                    isExpanded={expandedComments[idx]}
                    onToggleExpand={onToggleExpand}
                />
            ))}
        </div>
    );
}