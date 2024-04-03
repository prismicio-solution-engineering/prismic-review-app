import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import type * as prismic from "@prismicio/client";

/** @type {import("@prismicio/react").JSXMapSerializer} */

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="text-gray-darker text-center lg:text-left text-4xl lg:text-5xl font-sans font-bold mb-6">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="text-4xl font-sans font-bold text-gray-darker text-center mb-4">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="text-3xl font-sans font-bold text-gray-darker mb-4">
      {children}
    </h3>
  ),
  heading4: ({ children }) => (
    <h4 className="text-2xl font-sans font-bold text-gray-darker mb-4">
      {children}
    </h4>
  ),
  heading5: ({ children }) => (
    <h5 className="text-xl font-sans font-bold text-gray-darker mb-4">
      {children}
    </h5>
  ),
  heading6: ({ children }) => (
    <h6 className="text-xl font-sans font-bold text-gray-base mb-4">
      {children}
    </h6>
  ),
  paragraph: ({ children }) => (
    <p className="font-sans text-lg text-gray-base max-w-2xl text-center mx-auto mb-4">
      {children}
    </p>
  ),
  preformatted: ({ children }) => (
    <pre className="mt-3 mb-7 p-4 text-sm text-silver-light bg-gray-dark border-gray-darker rounded-lg shadow-lg whitespace-break-spaces">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2 text-lg list-inside text-gray-base">
      {children}
    </li>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2 text-lg list-inside text-gray-base">
      {children}
    </li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="text-primary-blue font-sans font-medium text-base underline underline-offset-8 hover:underline-offset-4 transition-all duration-300 ease-in-out"
    >
      {children}
    </PrismicNextLink>
  ),
  label: ({ node, children }) => {
    return (
      <>
        {node.data.label === "highlight" && (
          <span className="text-primary-blue">{children}</span>
        )}
        {node.data.label === "inline code" && (
          <span className="px-2 py-1 bg-silver-light border border-silver-base font-mono rounded-md text-sm font-normal text-primary-orange">
            {children}
          </span>
        )}
      </>
    );
  },
};

export function PrismicRichText({
  components,
  ...props
}: {
  components?: JSXMapSerializer;
  field: prismic.RichTextField;
}) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  );
}
