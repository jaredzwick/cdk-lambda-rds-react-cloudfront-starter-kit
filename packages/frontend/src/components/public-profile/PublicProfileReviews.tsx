import React from "react";
import { Star, ThumbsUp } from "lucide-react";

const reviews = [
  {
    name: "Michael R.",
    date: "2 weeks ago",
    rating: 5,
    content:
      "Sarah is an amazing cuddler! She made me feel completely comfortable and safe. Highly recommend!",
    helpful: 12,
  },
  {
    name: "Emily K.",
    date: "1 month ago",
    rating: 5,
    content:
      "Very professional and caring. The session helped me tremendously with my anxiety.",
    helpful: 8,
  },
];

export function PublicProfileReviews() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Reviews
      </h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {review.name}
                </span>
                <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {review.content}
            </p>
            <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {review.helpful} found this helpful
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
