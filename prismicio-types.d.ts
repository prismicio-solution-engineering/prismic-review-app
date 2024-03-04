// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type BestPracticeDocumentDataSlicesSlice =
  | AccordionSectionSlice
  | TextSectionSlice
  | HeroBannerSlice
  | TextSlice;

/**
 * Content for Best practice documents
 */
interface BestPracticeDocumentData {
  /**
   * Slice Zone field in *Best practice*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: best_practice.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<BestPracticeDocumentDataSlicesSlice> /**
   * Meta Description field in *Best practice*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: best_practice.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Best practice*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: best_practice.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Best practice*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: best_practice.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Best practice document from Prismic
 *
 * - **API ID**: `best_practice`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BestPracticeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BestPracticeDocumentData>,
    "best_practice",
    Lang
  >;

type HomeDocumentDataSlicesSlice =
  | PartnershipTiersSlice
  | FeaturesSlice
  | TestimonialsSlice
  | CallToActionSlice
  | TimelineSlice
  | TextSlice
  | TextSectionSlice
  | CheckListSlice
  | AccordionSectionSlice
  | NewsListSlice
  | FormSectionSlice
  | HeroBannerSlice
  | FeaturedPartnersSlice;

/**
 * Content for Home documents
 */
interface HomeDocumentData {
  /**
   * Slice Zone field in *Home*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Description field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Home*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

type NavigationDocumentDataSlices1Slice = MenuItemSlice;

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
  /**
   * Logo field in *Navigation*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never> /**
   * Slice Zone field in *Navigation*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.slices1[]
   * - **Tab**: Header
   * - **Documentation**: https://prismic.io/docs/field#slices
   */;
  slices1: prismic.SliceZone<NavigationDocumentDataSlices1Slice> /**
   * Search bar placeholder field in *Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.search_bar_placeholder
   * - **Tab**: Search
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  search_bar_placeholder: prismic.KeyTextField;

  /**
   * Search result page title field in *Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.search_result_page_title
   * - **Tab**: Search
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  search_result_page_title: prismic.KeyTextField;
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<NavigationDocumentData>,
    "navigation",
    Lang
  >;

type PageDocumentDataSlicesSlice =
  | FeaturesSlice
  | CallToActionSlice
  | PartnershipTiersSlice
  | TextSectionSlice
  | TimelineSlice
  | CheckListSlice
  | TextSlice
  | HeroBannerSlice
  | NewsListSlice
  | FormSectionSlice
  | FeaturedPartnersSlice
  | AccordionSectionSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Description field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Partnership Tier → Tier features*
 */
export interface PartnershipTierDocumentDataTierFeaturesItem {
  /**
   * Feature Description field in *Partnership Tier → Tier features*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: partnership_tier.tier_features[].feature_description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  feature_description: prismic.RichTextField;

  /**
   * Feature Icon field in *Partnership Tier → Tier features*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: partnership_tier.tier_features[].feature_icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  feature_icon: prismic.ImageField<never>;
}

/**
 * Content for Partnership Tier documents
 */
interface PartnershipTierDocumentData {
  /**
   * Tier name field in *Partnership Tier*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: partnership_tier.tier_name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  tier_name: prismic.TitleField;

  /**
   * Tier description field in *Partnership Tier*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: partnership_tier.tier_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  tier_description: prismic.RichTextField;

  /**
   * Tier image field in *Partnership Tier*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: partnership_tier.tier_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  tier_image: prismic.ImageField<never>;

  /**
   * Is Featured tier field in *Partnership Tier*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: partnership_tier.is_featured_tier
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  is_featured_tier: prismic.BooleanField;

  /**
   * Tier features field in *Partnership Tier*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: partnership_tier.tier_features[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  tier_features: prismic.GroupField<
    Simplify<PartnershipTierDocumentDataTierFeaturesItem>
  >;
}

/**
 * Partnership Tier document from Prismic
 *
 * - **API ID**: `partnership_tier`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PartnershipTierDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<PartnershipTierDocumentData>,
    "partnership_tier",
    Lang
  >;

type ReviewDocumentDataSlicesSlice =
  | TimelineSlice
  | TextSlice
  | TextSectionSlice
  | CheckListSlice
  | HeroBannerSlice
  | AccordionSectionSlice;

/**
 * Content for Review documents
 */
interface ReviewDocumentData {
  /**
   * Slice Zone field in *Review*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: review.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ReviewDocumentDataSlicesSlice> /**
   * Meta Description field in *Review*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: review.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Review*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: review.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Review*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: review.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Review document from Prismic
 *
 * - **API ID**: `review`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReviewDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<ReviewDocumentData>, "review", Lang>;

type ReviewsDocumentDataSlicesSlice =
  | FormSectionSlice
  | AccordionSectionSlice
  | HeroBannerSlice
  | TextSlice;

/**
 * Content for Reviews documents
 */
interface ReviewsDocumentData {
  /**
   * Slice Zone field in *Reviews*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: reviews.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ReviewsDocumentDataSlicesSlice> /**
   * Meta Description field in *Reviews*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: reviews.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Reviews*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: reviews.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Reviews*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: reviews.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Reviews document from Prismic
 *
 * - **API ID**: `reviews`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReviewsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<ReviewsDocumentData>,
    "reviews",
    Lang
  >;

/**
 * Item in *Reviews checklist → Criteria*
 */
export interface ReviewsChecklistDocumentDataCriteriaItem {
  /**
   * Topic field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: reviews_checklist.criteria[].topic
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  topic: prismic.SelectField<
    | "Slices and types"
    | "Queries"
    | "Templating into React/Vue"
    | "Routing"
    | "Content relationship"
    | "Assets"
    | "Dev experience"
    | "Editor experience"
  >;

  /**
   * Name field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: reviews_checklist.criteria[].name
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  name: prismic.TitleField;

  /**
   * Comment Next field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Comment for Next apps
   * - **API ID Path**: reviews_checklist.criteria[].comment_next
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  comment_next: prismic.RichTextField;

  /**
   * Comment Nuxt field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Comment for Nuxt apps
   * - **API ID Path**: reviews_checklist.criteria[].comment_nuxt
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  comment_nuxt: prismic.RichTextField;

  /**
   * Comment Sveltkit field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Comment for SveltKit apps
   * - **API ID Path**: reviews_checklist.criteria[].comment_sveltkit
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  comment_sveltkit: prismic.RichTextField;

  /**
   * Priority field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Select
   * - **Placeholder**: Criteria priority
   * - **API ID Path**: reviews_checklist.criteria[].priority
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  priority: prismic.SelectField<"High" | "Medium" | "Low">;

  /**
   * Is Slice library field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: reviews_checklist.criteria[].is_slice_library
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  is_slice_library: prismic.BooleanField;

  /**
   * Is Full Project field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: reviews_checklist.criteria[].is_full_project
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  is_full_project: prismic.BooleanField;

  /**
   * Review helper field in *Reviews checklist → Criteria*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Helper for SE team
   * - **API ID Path**: reviews_checklist.criteria[].review_helper
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  review_helper: prismic.RichTextField;
}

/**
 * Content for Reviews checklist documents
 */
interface ReviewsChecklistDocumentData {
  /**
   * Criteria field in *Reviews checklist*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: reviews_checklist.criteria[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  criteria: prismic.GroupField<
    Simplify<ReviewsChecklistDocumentDataCriteriaItem>
  >;
}

/**
 * Reviews checklist document from Prismic
 *
 * - **API ID**: `reviews_checklist`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReviewsChecklistDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<ReviewsChecklistDocumentData>,
    "reviews_checklist",
    Lang
  >;

type UseCaseDocumentDataSlicesSlice =
  | NewsListSlice
  | TextSectionSlice
  | AccordionSectionSlice
  | HeroBannerSlice
  | TextSlice
  | FormSectionSlice;

/**
 * Content for Use case documents
 */
interface UseCaseDocumentData {
  /**
   * Slice Zone field in *Use case*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: use_case.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<UseCaseDocumentDataSlicesSlice> /**
   * Meta Description field in *Use case*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: use_case.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Use case*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: use_case.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Use case*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: use_case.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Use case document from Prismic
 *
 * - **API ID**: `use_case`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type UseCaseDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<UseCaseDocumentData>,
    "use_case",
    Lang
  >;

export type AllDocumentTypes =
  | BestPracticeDocument
  | HomeDocument
  | NavigationDocument
  | PageDocument
  | PartnershipTierDocument
  | ReviewDocument
  | ReviewsDocument
  | ReviewsChecklistDocument
  | UseCaseDocument;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      BestPracticeDocument,
      BestPracticeDocumentData,
      BestPracticeDocumentDataSlicesSlice,
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataSlicesSlice,
      NavigationDocument,
      NavigationDocumentData,
      NavigationDocumentDataSlices1Slice,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      PartnershipTierDocument,
      PartnershipTierDocumentData,
      PartnershipTierDocumentDataTierFeaturesItem,
      ReviewDocument,
      ReviewDocumentData,
      ReviewDocumentDataSlicesSlice,
      ReviewsDocument,
      ReviewsDocumentData,
      ReviewsDocumentDataSlicesSlice,
      ReviewsChecklistDocument,
      ReviewsChecklistDocumentData,
      ReviewsChecklistDocumentDataCriteriaItem,
      UseCaseDocument,
      UseCaseDocumentData,
      UseCaseDocumentDataSlicesSlice,
      AllDocumentTypes,
    };
  }
}
