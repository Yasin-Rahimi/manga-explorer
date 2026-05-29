import { FaStar, FaUser, FaCalendarAlt } from 'react-icons/fa';

export default function SampleReviews({ reviews }) {

    if (!reviews || reviews.length === 0) return null;

    const sampleReviews = reviews.slice(0, 3);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                <FaStar className="text-yellow-400" />
                User Reviews
            </h3>

            <div className="space-y-4">
                
                {sampleReviews.map((review, idx) => (
                    <div key={idx} className="border-b border-white/10 pb-3 last:border-0">
                        
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

                        <div className="flex items-center gap-1 mb-2">
                            
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`w-3 h-3 ${i < (review.score || 0) ? 'text-yellow-400' : 'text-gray-600'}`}
                                />
                            ))}

                            <span className="text-xs text-gray-400 ml-2">({review.score || 'N/A'})</span>

                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                            {review.review || review.comments || 'No content'}
                        </p>

                    </div>
                ))}
                
            </div>

        </div>
    );
}