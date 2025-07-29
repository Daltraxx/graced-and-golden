import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className='' >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="">{children}</p>
  )
}

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      horizontalSpacing={false}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      <div>
        <section>
          <PrismicRichText field={slice.primary.text_heading} components={components} />
          <div>
            <div>
              <PrismicRichText field={slice.primary.text_column_1} components={components} />
            </div>
            <div>
              <PrismicRichText field={slice.primary.text_column_2} components={components} />
              <Button field={slice.primary.link} color="cream-200" />
            </div>
          </div>
        </section>
        <div>
          <PrismicNextImage field={slice.primary.front_image} />
          <PrismicNextImage field={slice.primary.back_image} />
        </div>
      </div>
    </Bounded>
  );
};

export default About;
