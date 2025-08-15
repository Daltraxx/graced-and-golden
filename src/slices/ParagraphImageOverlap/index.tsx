'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/ParagraphImageOverlap/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="xs" >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p>{children}</p>
  )
}

/**
 * Props for `ParagraphImageOverlap`.
 */
export type ParagraphImageOverlapProps =
  SliceComponentProps<Content.ParagraphImageOverlapSlice>;

/**
 * Component for "ParagraphImageOverlap" Slices.
 */
const ParagraphImageOverlap: FC<ParagraphImageOverlapProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef, .3);
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      horizontalSpacing={false}
      verticalPadding={false}
      ref={containerRef}
    >
      <div className={clsx(moduleStyles.contentContainer)}>
        <section className={(moduleStyles.textContainer)}>
          <div className={clsx(moduleStyles.textDiv, "animated-element")} >
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.body_text}
              components={components}
            />
          </div>
        </section>
        <div
          style={{ backgroundImage: `url(${slice.primary.image.url})` }}
          className={moduleStyles.imageContainer}
        ></div>
      </div>
    </Bounded>
  );
};

export default ParagraphImageOverlap;
