"use client";
import { useState, useEffect } from "react";
import {
  deleteReview,
  getAgencyReviews,
  getReview,
  getReviewCriteria,
  getReviews,
} from "@/utils/reviews";
import { Button } from "../Button";
import Notification from "../Notification";
import Drawer from "../Drawer";
import { Feedback } from "./Feedback";
import { getReviewsChecklist } from "@/utils/getReviewsChecklist";
import * as prismic from "@prismicio/client";

interface Agency {
  id: number;
  name: string;
}

interface Review {
  id: number;
  agency_id: number;
  review_type: "sample" | "full";
  date: string;
  overall_comments: string;
  is_passed: boolean;
  status: string;
  agencies: Agency;
  framework: string;
}

interface Criterion {
  category: prismic.ContentRelationshipField<"review_criteria_category">;
  name: prismic.TitleField;
  comment_next: prismic.RichTextField;
  comment_nuxt: prismic.RichTextField;
  comment_sveltkit: prismic.RichTextField;
  priority: prismic.SelectField<"High" | "Medium" | "Low">;
  is_slice_library: prismic.BooleanField;
  is_full_project: prismic.BooleanField;
  review_helper: prismic.RichTextField;
  where_to_check: prismic.SelectField<
    "Code" | "Slice Machine" | "Website",
    "filled"
  >;
}

export const ReviewsList = ({
  agencyId,
  prismicCriteria,
}: {
  agencyId?: number | null;
  prismicCriteria?: Criterion[];
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
  const [reviewCriteriaToEdit, setReviewCriteriaToEdit] = useState<
    Map<string, { evaluation: string; comments: string }>
  >(new Map());

  useEffect(() => {
    if (selectedReview) {
      // Fetch the review details from Supabase by ID
      const fetchReview = async () => {
        const reviewData = await getReview(selectedReview.id);
        const criteriaData = await getReviewCriteria(selectedReview.id);
        setReviewToEdit(reviewData);
        setReviewCriteriaToEdit(criteriaData);
      };

      fetchReview();
    }
  }, [selectedReview?.id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const loadedReviews = agencyId
        ? await getAgencyReviews(agencyId)
        : await getReviews();
      setReviews(loadedReviews);
    };

    fetchReviews();
  }, [agencyId]); // When the agencyId prop changes, re-runs to fetch reviews to keep state in sync with props

  const handleDelete = async (id: number) => {
    const success = await deleteReview(id);
    if (success) {
      const updatedReviews = reviews.filter((review) => review.id !== id);
      setReviews(updatedReviews);
      setNotification({
        type: "success",
        message: "Review successfully deleted",
      });
    } else {
      setNotification({
        type: "error",
        message: "Failed to delete the review.",
      });
    }
  };

  return (
    <div className="flex flex-col my-16">
      {/* {openDrawer && ( */}
        <Drawer openDrawer={openDrawer} onOpenDrawer={setOpenDrawer}>
          {reviewToEdit && (
            <Feedback
              prismicCriteria={prismicCriteria} // Ensure you have the criteria data available, Rename into Checklist or prismicCriteria
              reviewType={reviewToEdit.review_type}
              initialReview={reviewToEdit} // Prop to pass the existing review data
              initialReviewCriteria={reviewCriteriaToEdit}
            />
          )}
        </Drawer>
      {/* )} */}
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        Reviews
      </h3>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <div className="overflow-x-auto rounded-lg border">
        <table className="table-auto min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
              Agency
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Is Passed
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Edit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {review.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-ellipsis text-sm text-gray-900">
                  {review.agencies.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {review.review_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(review.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {review.is_passed ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {review.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    button
                    variant="link"
                    onClick={() => {
                      setSelectedReview(review);
                      setOpenDrawer(true);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    submit
                    color="custom"
                    onClick={() => handleDelete(review.id)}
                    className="bg-transparent text-primary-orange hover:bg-transparent hover:text-secondary-orange"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
