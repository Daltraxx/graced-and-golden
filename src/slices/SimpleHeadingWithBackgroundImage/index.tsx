import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/SimpleHeadingWithBackgroundImage/styles.module.css';

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="manual" className={moduleStyles.heading} >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="manual" className={moduleStyles.heading} >
      {children}
    </Heading>
  )
}

/**
 * Props for `SimpleHeadingWithBackgroundImage`.
 */
export type SimpleHeadingWithBackgroundImageProps =
  SliceComponentProps<Content.SimpleHeadingWithBackgroundImageSlice>;

/**
 * Component for "SimpleHeadingWithBackgroundImage" Slices.
 */
const SimpleHeadingWithBackgroundImage: FC<SimpleHeadingWithBackgroundImageProps> = ({ slice }) => {
  // allow background image to be overriden by prismic if one is provided
  const bgImageURL = slice.primary.background_image.url || '/grace-jen-upscale-mod-dark-min.jpg';

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      horizontalSpacing={false}
      verticalPadding={false}
      className={moduleStyles.boundedContainer}
    >
      <div style={{backgroundImage: `url(${bgImageURL})`}} className={moduleStyles.headingContainer}>
        <PrismicRichText field={slice.primary.heading} components={components} />
      </div>
    </Bounded>
  );
};

export default SimpleHeadingWithBackgroundImage;
