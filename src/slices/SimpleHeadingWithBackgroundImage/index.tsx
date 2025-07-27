import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/ServiceHero/styles.module.css';
import clsx from "clsx";

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
const SimpleHeadingWithBackgroundImage: FC<
  SimpleHeadingWithBackgroundImageProps
> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      horizontalSpacing={false}
      verticalPadding={false}
    >
      <div style={{backgroundImage: `url(${slice.primary.background_image.url})`}}>
        <PrismicRichText field={slice.primary.heading} components={components} />
      </div>
    </Bounded>
  );
};

export default SimpleHeadingWithBackgroundImage;
