import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className="">
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="">
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="">{children}</p>
  ),
}

/**
 * Props for `Info4Col`.
 */
export type Info4ColProps = SliceComponentProps<Content.Info4ColSlice>;

/**
 * Component for "Info4Col" Slices.
 */
const Info4Col: FC<Info4ColProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.main_heading} />
      {slice.primary.column.map((item) => (
        <section>
          <PrismicRichText field={item.heading} />
          <PrismicRichText field={item.body_text} />
        </section>
      ))}
    </Bounded>
  );
};

export default Info4Col;
