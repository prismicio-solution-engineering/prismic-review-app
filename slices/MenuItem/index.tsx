import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import DefaultMenuItem from "./DefaultMenuItem";
import WithSubItemsMenuItem from "./WithSubItemsMenuItem";

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

/**
 * Component for "MenuItem" Slices.
 */
const MenuItem = ({ slice, context }: MenuItemProps): JSX.Element => {
    switch (slice.variation) {
      case "default":
        return <DefaultMenuItem slice={slice} isMobileMenu={context} />;
      case "withSubMenu":
        return <WithSubItemsMenuItem slice={slice} isMobileMenu={context} />;
    }
};

export default MenuItem;
