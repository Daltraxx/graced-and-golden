'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/SimpleHeadingWithBackgroundImage/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

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
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      horizontalSpacing={false}
      verticalPadding={false}
      style={{ backgroundImage: `url(${slice.primary.background_image.url})` }}
      className={clsx(
        slice.variation === 'default' && moduleStyles.boundedContainer,
        slice.variation === 'centeredImage' && moduleStyles.boundedContainerCenteredImage
      )}
      ref={containerRef}
    >
      <div className={clsx(moduleStyles.headingContainer, "animated-element")}>
        <PrismicRichText
          field={slice.primary.heading}
          components={components}
        />
      </div>
    </Bounded>
  );
};

export default SimpleHeadingWithBackgroundImage;
