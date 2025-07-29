import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className='' >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="md" className='' >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="">{children}</p>
  )
}

/**
 * Props for `SimpleColumnWLink`.
 */
export type SimpleColumnWLinkProps =
  SliceComponentProps<Content.SimpleColumnWLinkSlice>;

/**
 * Component for "SimpleColumnWLink" Slices.
 */
const SimpleColumnWLink: FC<SimpleColumnWLinkProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <PrismicRichText field={slice.primary.heading} components={components} />
        <PrismicRichText field={slice.primary.body_text} components={components} />
        <Button field={slice.primary.link} color="brown-500" />
      </div>
    </Bounded>
  );
};

export default SimpleColumnWLink;
