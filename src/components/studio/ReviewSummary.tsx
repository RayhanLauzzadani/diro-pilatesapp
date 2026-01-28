interface ReviewSummaryProps {
    rating: number;
    totalReview: number;
}

const ratingItems = [
    { label: "Cleanliness", score: "4.9" },
    { label: "Instructor Quality", score: "4.8" },
    { label: "Facilities", score: "4.7" },
    { label: "Value for Money", score: "4.8" },
];

export default function ReviewSummary({ rating, totalReview }: ReviewSummaryProps) {
    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">{rating}/5</h2>
                    <p className="text-gray-600">Based on {totalReview} verified reviews</p>
                </div>
                <button className="text-blue-600 font-medium hover:underline hidden md:block">
                    Read all reviews
                </button>
            </div>
            
            {/* Rating Bars */}
            <div className="space-y-4 max-w-lg">
                {ratingItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700 w-32">{item.label}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${(parseFloat(item.score) / 5) * 100}%` }} 
                            />
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-8">{item.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
