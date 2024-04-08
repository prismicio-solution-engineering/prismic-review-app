import React from "react";
import { PrismicRichText } from "../PrismicRichText";
import * as prismic from "@prismicio/client";

const ReviewSummary = ({
  criteria,
  criteriaEvaluations,
  selectedFramework,
  overallComments,
}) => {
  const getFrameworkComment = (criterion) => {
    switch (selectedFramework) {
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
  };

  const summaryComments = criteria
    .filter((criterion) => {
      const evaluation = criteriaEvaluations.get(
        prismic.asText(criterion.name)
      )?.evaluation;
      return evaluation === "Failed"; // TODO : Include criteria that are passed but with comment
    })
    .map((criterion) => {
      const evaluationDetails = criteriaEvaluations.get(
        prismic.asText(criterion.name)
      );
      const frameworkComment = getFrameworkComment(criterion);
      return {
        name: prismic.asText(criterion.name),
        frameworkComment: frameworkComment,
        reviewerComment: evaluationDetails?.comments,
      };
    });

  return (
    <div className="my-8">
      <h3 className="text-3xl font-semibold mb-6 text-center">
        Review Summary
      </h3>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <h4 className="text-2xl font-semibold mb-6">Overall Comment</h4>
          {overallComments && <p className="my-2">{overallComments}</p>}
        </div>
        <div>
          <h4 className="text-2xl font-semibold mb-6">Detailed Comments</h4>

          <ul className="flex flex-col gap-10">
            {summaryComments.map((comment, idx) => (
              <li key={idx}>
                <strong>{comment.name}:</strong>
                <PrismicRichText field={comment.frameworkComment} />
                {comment.reviewerComment && (
                  <div>
                    <b className="">Additional Comment</b>
                    <p className="italic">{comment.reviewerComment}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
