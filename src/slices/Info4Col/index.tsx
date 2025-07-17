import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/Info4Col/styles.module.css';

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="lg" className={moduleStyles.mainHeading} >
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
      className={moduleStyles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      {slice.primary.column.map((item) => (
        <section className={moduleStyles.box} >
          <PrismicRichText field={item.heading} components={components} />
          <PrismicRichText field={item.body_text} components={components} />
        </section>
      ))}
    </Bounded>
  );
};

export default Info4Col;
