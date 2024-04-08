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

// Create Review
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

// Read Review
export const getReviews = async () => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(
      `
        id,
        review_type,
        date,
        is_passed,
        status,
        agencies ( name, id )
      `
    )
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return reviews;
};

export const getAgencyReviews = async (agencyId: number) => {
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
        agencies ( name, id )
      `
    )
    .eq("agency_id", agencyId)
    .order("review_type", { ascending: false })

  if (error) {
    console.error("Error fetching agency reviews:", error);
    return [];
  }

  return reviews;
};

export const getReview = async (id: number) => {
  const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching review:", error);
    return null;
  }
  console.log(review)
  return review;
  ;
}

// Update Review
export const updateReview = async (id: number, updateData: Partial<Review>) => {
  const { data, error } = await supabase
    .from("reviews")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating review:", error);
    return null;
  }

  return data[0].id;
};

// Delete Review
export const deleteReview = async (id: number) => {

  // Delete all criteria associated with the review
  const { error: deleteCriteriaError } = await supabase
    .from("review_criteria")
    .delete()
    .eq("review_id", id);

  if (deleteCriteriaError) {
    console.error("Error deleting review criteria:", deleteCriteriaError);
    return false;
  }

  // Delete review
  const { data, error: deleteReviewError } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (deleteReviewError) {
    console.error("Error deleting review:", deleteReviewError);
    return false;
  }
  console.log(data)
  return true;
};

// Create Review Criteria
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
  }
  return true
};

export const updateReviewCriteria = async (reviewId: number, criteria: ReviewCriteria[]) => {
  const detailedCriteria = criteria.map(criterion => ({
    ...criterion,
    review_id: reviewId, // Ensure each criterion is associated with the review ID
  }));

  const { error } = await supabase
    .from('review_criteria')
    .upsert(detailedCriteria, {onConflict: "criteria_name"});

  if (error) {
    console.error('Error editing review criteria:', error);
  }

  return true
};
export const getReviewCriteria = async (reviewId: number) => {
  const { data: criteria, error } = await supabase
    .from("review_criteria")
    .select("*")
    .eq("review_id", reviewId)

  if (error) {
    console.error("Error fetching review's criteria:", error);
    return [];
  }
console.log(criteria)
  return criteria;
};