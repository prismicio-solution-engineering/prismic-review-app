"use client";

import { updateAgency } from "@/utils/agencies";
import { EditAgencyForm } from "./EditAgencyForm";
import { ReviewsList } from "../Reviews/ReviewsList";
import * as prismic from "@prismicio/client";

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
export const AgencyDashboard = ({
  agencyData,
  criteria,
}: {
  agencyData: Agency;
  criteria: Criterion[];
}) => {
  return (
    <div className="flex flex-col my-16 max-w-screen-xl mx-auto">
      <h2 className="text-5xl text-center font-sans font-bold text-gray-darker mb-6">
        {agencyData.name}
      </h2>
      <EditAgencyForm
        agencyData={agencyData}
        onSubmit={updateAgency}
        isLoading={false}
      />
      <ReviewsList agencyId={agencyData.id} criteria={criteria} />
    </div>
  );
};
