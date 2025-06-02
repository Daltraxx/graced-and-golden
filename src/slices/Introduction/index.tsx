import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

const components : JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="">
      {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p>{children}</p>
  )
}
/**
 * Props for `Introduction`.
 */
export type IntroductionProps = SliceComponentProps<Content.IntroductionSlice>;

/**
 * Component for "Introduction" Slices.
 */
const Introduction: FC<IntroductionProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <PrismicRichText field={slice.primary.heading} components={components} />
      <div>
        <PrismicRichText field={slice.primary.paragraphs_column_1} components={components} />
        <PrismicRichText field={slice.primary.paragraphs_column_2} components={components} />
      </div>
    </Bounded>
  );
};

export default Introduction;
