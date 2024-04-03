"use client";
import { ReviewCriteriaForm } from "@/components/Reviews/ReviewCriteriaForm";
import { ReviewSubmissionForm } from "@/components/Reviews/ReviewSubmissionForm";
import * as prismic from "@prismicio/client";
import { useState } from "react";
import { addReview, addReviewCriteria } from "@/utils/reviews"; // Assuming these are implemented
import { Button } from "../Button";
import { redirect } from "next/navigation";

interface Agency {
  id: number;
  name: string;
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

export function Feedback({
  criteria,
  reviewType,
}: {
  criteria: Criterion[];
  reviewType: "sample" | "full";
}) {
  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const [overallComments, setOverallComments] = useState<string>("");
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("To review");

  const [criteriaEvaluations, setCriteriaEvaluations] = useState<
    Map<string, { evaluation: string; comments: string }>
  >(new Map());

  const handleSubmit = async () => {
    if (!selectedAgency) {
      alert("Please select an agency.");
      return;
    }

    // Submit the main review details first
    const reviewData = {
      agency_id: selectedAgency,
      review_type: reviewType,
      framework: selectedFramework,
      overall_comments: overallComments,
      is_passed: isPassed,
      status: status,
    };

    
    const reviewId = await addReview(reviewData);
    
    if (reviewId) {
      // Then, submit the criteria evaluations
      const criteriaSubmissions = Array.from(criteriaEvaluations).map(
        ([name, { evaluation, comments }]) => ({
          review_id: reviewId,
          criteria_name: name,
          evaluation,
          comments,
        })
      );

      console.log(
        "Review data",
        reviewData,
        "Review form",
        criteriaSubmissions
      );
      await addReviewCriteria(reviewId, criteriaSubmissions);
    } else {
      alert("Failed to add review");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <ReviewSubmissionForm
        onAgencySelect={setSelectedAgency}
        onFrameworkSelect={setSelectedFramework}
        onOverallCommentsChange={setOverallComments}
        onIsPassedChange={setIsPassed}
        onStatusChange={setStatus}
        reviewType={reviewType}
      />
      <ReviewCriteriaForm
        criteria={criteria}
        reviewType={reviewType}
        onCriteriaEvaluationChange={setCriteriaEvaluations}
      />
      <Button submit onClick={handleSubmit} color="black">
        Submit Review
      </Button>
    </div>
  );
}
