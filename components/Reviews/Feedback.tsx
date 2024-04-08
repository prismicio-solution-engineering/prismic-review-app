"use client";
import { ReviewCriteriaForm } from "@/components/Reviews/ReviewCriteriaForm";
import { ReviewSubmissionForm } from "@/components/Reviews/ReviewSubmissionForm";
import * as prismic from "@prismicio/client";
import { useEffect, useState } from "react";
import {
  addReview,
  addReviewCriteria,
  updateReview,
  updateReviewCriteria,
} from "@/utils/reviews";
import { Button } from "../Button";
import { PrismicRichText } from "../PrismicRichText";
import ReviewSummary from "./ReviewSummary";
import { asText } from "@prismicio/client/richtext";

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
  agency: Agency;
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

interface CriterionEvaluation {
  criteria_name: string;
  evaluation: string;
  comments: string;
}

export function Feedback({
  prismicCriteria,
  reviewType,
  initialReview,
  initialReviewCriteria,
}: {
  prismicCriteria: Criterion[];
  reviewType: "sample" | "full";
  initialReview?: Review;
  initialReviewCriteria?: CriterionEvaluation[];
}) {
  const [selectedAgency, setSelectedAgency] = useState<number | null>(
    initialReview?.agency_id || null
  );
  const [selectedFramework, setSelectedFramework] = useState<string>(
    initialReview?.framework || ""
  );
  const [overallComments, setOverallComments] = useState<string>(
    initialReview?.overall_comments || ""
  );
  const [isPassed, setIsPassed] = useState<boolean>(
    initialReview?.is_passed || false
  );
  const [status, setStatus] = useState<string>(
    initialReview?.status || "To review"
  );

  const [summaryComments, setSummaryComments] = useState([]);

  const initialCriteriaEvaluations = new Map<
    string,
    { evaluation: string; comments: string }
  >();

  // Populate the initial state based on initialReviewCriteria
  initialReviewCriteria?.forEach((criterion) => {
    const key = criterion.criteria_name;
    console.log(`Key: ${key}, Evaluation: ${criterion.evaluation}, Comments: ${criterion.comments}`);
    if (key) {
      initialCriteriaEvaluations.set(key, {
          evaluation: criterion.evaluation,
          comments: criterion.comments,
      });
  }
    initialCriteriaEvaluations.set(criterion.name, {
      evaluation: criterion.evaluation,
      comments: criterion.comments,
    });
  });

  const [criteriaEvaluations, setCriteriaEvaluations] = useState<
    Map<string, { evaluation: string; comments: string }>
  >(initialCriteriaEvaluations);

  // Handle summary comments based on criteriaEvaluations
  useEffect(() => {
    const newSummaryComments = prismicCriteria
      .filter((prismicCriterion) => {
        const evaluation = criteriaEvaluations.get(
          asText(prismicCriterion.name)
        )?.evaluation;
        return evaluation === "Failed"; // TODO : Include criteria that are passed but with comments
      })
      .map((prismicCriterion) => {
        const evaluationDetails = criteriaEvaluations.get(
          prismic.asText(prismicCriterion.name)
        );
        const frameworkComment = getFrameworkComment(
          prismicCriterion,
          selectedFramework
        );
        const combinedComment = {
          name: prismic.asText(prismicCriterion.name),
          frameworkComment,
          reviewerComment: evaluationDetails?.comments,
        };
        return combinedComment;
      });

    setSummaryComments(newSummaryComments);
  }, [criteriaEvaluations, prismicCriteria, selectedFramework]);

  function getFrameworkComment(criterion, framework) {
    switch (framework) {
      case "Nuxt.js":
        return criterion.comment_nuxt.length > 0
          ? criterion.comment_nuxt
          : criterion.comment_next;
      case "SvelteKit":
        return criterion.comment_sveltkit.length > 0
          ? criterion.comment_sveltkit
          : criterion.comment_next;
      default:
        return criterion.comment_next;
    }
  }

  // Handle updates
  useEffect(() => {
    const newCriteriaEvaluations = new Map<
      string,
      { evaluation: string; comments: string }
    >();
    initialReviewCriteria?.forEach((criterion) => {
      newCriteriaEvaluations.set(criterion.criteria_name, {
        evaluation: criterion.evaluation,
        comments: criterion.comments,
      });
    });
    setCriteriaEvaluations(newCriteriaEvaluations);
  }, [initialReviewCriteria]);

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

  const handleSave = async () => {
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

    const updatedReview =
      initialReview && (await updateReview(initialReview.id, reviewData));

    // if updated review and that review has criteria then update them
    if (updatedReview) {
      // Then, submit the criteria evaluations
      const criteriaSubmissions = Array.from(criteriaEvaluations).map(
        ([name, { evaluation, comments }]) => ({
          review_id: updatedReview.id,
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
      await updateReviewCriteria(updatedReview, criteriaSubmissions);
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
        initialAgencyId={initialReview?.agency_id}
        initialFramework={initialReview?.framework}
        initialOverallComments={initialReview?.overall_comments}
        initialStatus={initialReview?.status}
        initialIsPassed={initialReview?.is_passed}
      />
      <ReviewCriteriaForm
        criteria={prismicCriteria}
        reviewType={reviewType}
        onCriteriaEvaluationChange={setCriteriaEvaluations}
        initialReviewCriteria={initialReviewCriteria}
      />
      <div className="flex flex-row gap-10">
        <Button submit onClick={handleSubmit} color="black">
          Submit new review
        </Button>
        <Button submit onClick={handleSave} color="black">
          Save review
        </Button>
      </div>
      <div className="">
        <div className="grow rounded-lg bg-gray-100 p-4 md:p-6 my-16">
          <ReviewSummary
            criteria={prismicCriteria}
            criteriaEvaluations={criteriaEvaluations}
            selectedFramework={selectedFramework}
            overallComments={overallComments}
          />
        </div>
      </div>
    </div>
  );
}
