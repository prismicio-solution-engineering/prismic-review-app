import * as prismic from "@prismicio/client";

export interface ReviewsChecklistDocument extends prismic.PrismicDocument {
  data: {
    criteria: {
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
    };
  };
}

const reviewsChecklistQuery = `
{
  reviews_checklist {
    criteria {
      name
      category {
        ...on review_criteria_category {
          ...review_criteria_categoryFields
        }
      }
      comment_next
      comment_nuxt
      comment_sveltkit
      priority
      is_slice_library
      is_full_project
      review_helper
      where_to_check
    }
  }
}
`;

const client = prismic.createClient<ReviewsChecklistDocument>(
  "https://prismic-partners-web.cdn.prismic.io/api/v2"
);

export const getReviewsChecklist = async () => {
  try {
    const fullChecklist = await client.getSingle("reviews_checklist", {graphQuery: reviewsChecklistQuery});
    return fullChecklist;
  } catch (error) {
    console.log("Error fetching the checklists :", error);
    return [];
  }
};