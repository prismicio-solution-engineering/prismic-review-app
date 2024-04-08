"use client";
import React, { Fragment, useState } from "react";
import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { addReviewCriteria } from "@/utils/reviews";

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

interface ReviewCriteriaFormProps {
  criteria: Criterion[];
  reviewType: "sample" | "full";
  onCriteriaEvaluationChange: (
    criteriaEvaluations: Map<string, { evaluation: string; comments: string }>
  ) => void;
  initialReviewCriteria?: CriterionEvaluation[];
}

const evaluations = ["N/A", "Passed", "Failed"];

export const ReviewCriteriaForm: React.FC<ReviewCriteriaFormProps> = ({
  criteria,
  reviewType,
  onCriteriaEvaluationChange,
  initialReviewCriteria,
}) => {
  const filteredCriteria = criteria.filter((criterion) =>
    reviewType === "sample"
      ? criterion.is_slice_library
      : criterion.is_full_project
  );

  const initialCriteriaEvaluationsMap = new Map<
    string,
    { evaluation: string; comments: string }
  >();
  initialReviewCriteria.forEach((criterion) => {
    initialCriteriaEvaluationsMap.set(criterion.criteria_name, {
      evaluation: criterion.evaluation,
      comments: criterion.comments,
    });
  });

  // const [criteriaEvaluations, setCriteriaEvaluations] = useState<Map<string, CriterionEvaluation>>(new Map());
  const [criteriaEvaluations, setCriteriaEvaluations] = initialReviewCriteria
    ? useState<Map<string, { evaluation: string; comments: string }>>(
        initialCriteriaEvaluationsMap
      )
    : useState<Map<string, CriterionEvaluation>>(new Map());

  // const handleEvaluationChange = (
  //   criterionName: string,
  //   evaluation: string
  // ) => {
  //   const updatedEvaluations = new Map(criteriaEvaluations);
  //   const currentCriterion = updatedEvaluations.get(criterionName) || {
  //     criteria_name: criterionName,
  //     evaluation: "",
  //     comments: "",
  //   };
  //   updatedEvaluations.set(criterionName, { ...currentCriterion, evaluation });
  //   setCriteriaEvaluations(updatedEvaluations);
  //   onCriteriaEvaluationChange(updatedEvaluations);
  // };

  const handleEvaluationChange = (
    criterionName: string,
    evaluation: string
  ) => {
    const updatedEvaluations = new Map(criteriaEvaluations);
    const currentCriterion = updatedEvaluations.get(criterionName) || {
      evaluation: "",
      comments: "",
    };
    updatedEvaluations.set(criterionName, { ...currentCriterion, evaluation });
    setCriteriaEvaluations(updatedEvaluations);
    onCriteriaEvaluationChange(updatedEvaluations);
  };

  // const handleCommentsChange = (criterionName: string, comments: string) => {
  //   const updatedEvaluations = new Map(criteriaEvaluations);
  //   const currentCriterion = updatedEvaluations.get(criterionName) || {
  //     criteria_name: criterionName,
  //     evaluation: "N/A",
  //     comments: "",
  //   };
  //   updatedEvaluations.set(criterionName, { ...currentCriterion, comments });
  //   setCriteriaEvaluations(updatedEvaluations);
  //   onCriteriaEvaluationChange(updatedEvaluations);
  // };

  const handleCommentsChange = (criterionName: string, comments: string) => {
    const updatedEvaluations = new Map(criteriaEvaluations);
    const currentCriterion = updatedEvaluations.get(criterionName) || {
      evaluation: "N/A",
      comments: "",
    };
    updatedEvaluations.set(criterionName, { ...currentCriterion, comments });
    setCriteriaEvaluations(updatedEvaluations);
    onCriteriaEvaluationChange(updatedEvaluations);
  };

  return (
    <div className="overflow-x-auto rounded-lg border max-w-screen-xl mx-auto my-16 p-8">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Evaluation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comments
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCriteria.map((criterion, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <PrismicText field={criterion.name} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Listbox
                  value={
                    criteriaEvaluations.get(prismic.asText(criterion.name))
                      ?.evaluation || evaluations[0]
                  }
                  onChange={(value) =>
                    handleEvaluationChange(
                      prismic.asText(criterion.name),
                      value
                    )
                  }
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 border border-gray-300 sm:text-sm">
                        <span className="block truncate">
                          {criteriaEvaluations.get(
                            prismic.asText(criterion.name)
                          )?.evaluation || evaluations[0]}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {evaluations.map((evaluation) => (
                            <Listbox.Option
                              key={evaluation}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-100" : "text-gray-900"}`
                              }
                              value={evaluation}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                  >
                                    {evaluation}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </>
                  )}
                </Listbox>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <input
                  type="text"
                  value={criteriaEvaluations.get(prismic.asText(criterion.name))?.comments || ""}
                  onChange={(e) =>
                    handleCommentsChange(
                      prismic.asText(criterion.name),
                      e.target.value
                    )
                  }
                  className="rounded border-gray-300"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
