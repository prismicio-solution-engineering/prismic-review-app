"use client";
import { useState, useEffect } from "react";
import { getReviews } from "@/utils/reviews";

interface Agency {
  name: string;
}

interface Review {
  id: number;
  agency_id: number;
  review_type: string;
  date: string;
  overall_comments: string;
  is_passed: boolean;
  status: string;
  agencies: Agency;
}

export const ReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const loadedReviews = await getReviews();
      setReviews(loadedReviews);
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col my-16 max-w-screen-xl mx-auto">
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        Reviews
      </h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Passed</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.agencies.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.review_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(review.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.is_passed ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.overall_comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
