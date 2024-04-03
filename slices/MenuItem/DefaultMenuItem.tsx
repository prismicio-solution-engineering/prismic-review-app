"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

/**
 * Component for "MenuItem" Slices.
 */
const DefaultMenuItem = ({
  slice,
  isMobileMenu,
}: {
  slice: Content.MenuItemSliceDefault;
  isMobileMenu: boolean;
}): JSX.Element => {
  return (
    <>
      {isMobileMenu ? (
        <PrismicNextLink
          field={slice.primary.link}
          className="block text-[#151515] hover:text-primary-blue py-2"
        >
          {slice.primary.label}
        </PrismicNextLink>
      ) : (
        <PrismicNextLink
          field={slice.primary.link}
          className="text-[#151515] hover:text-primary-blue block mt-4 md:mt-0"
        >
          {slice.primary.label}
        </PrismicNextLink>
      )}
    </>
  );
};

export default DefaultMenuItem;
