import { redirect } from "next/navigation";
import { createClient } from "./supabase/client";

interface Review {
  id: number;
  agency_id: number;
  review_type: string;
  date: string;
  overall_comments: string;
  framework: string;
  is_passed: boolean;
  status: string;
}

interface ReviewCriteria {
  review_id: number;
  criteria_name: string;
  evaluation: string;
  comments: string;
}

const supabase = createClient();

export const addReview = async (review: Review): Promise<number | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select();

  if (error) {
    console.error('Error adding review:', error);
    return null;
  }

  return data[0].id; // Assuming 'id' is the primary key of the inserted review
};

export const getReviews = async () => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(
      `
        id,
        review_type,
        date,
        overall_comments,
        is_passed,
        status,
        agencies ( name )
      `
    )
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return reviews;
};

export const addReviewCriteria = async (reviewId: number, criteria: ReviewCriteria[]) => {
  const detailedCriteria = criteria.map(criterion => ({
    ...criterion,
    review_id: reviewId, // Ensure each criterion is associated with the review ID
  }));

  const { error } = await supabase
    .from('review_criteria')
    .insert(detailedCriteria);

  if (error) {
    console.error('Error adding review criteria:', error);
  } else {
    redirect('/reviews')
  }
};