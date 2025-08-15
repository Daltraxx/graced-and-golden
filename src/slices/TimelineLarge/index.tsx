'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from '../../components/Bounded';
import moduleStyles from '@/slices/TimelineLarge/styles.module.css';
import { PrismicNextImage } from "@prismicio/next";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="lg" >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="md" >
      {children}
    </Heading>
  ),
  list: ({ children }) => (
    <ul className="list-disc">
      {children}
    </ul>
  )
}

/**
 * Props for `TimelineLarge`.
 */
export type TimelineLargeProps =
  SliceComponentProps<Content.TimelineLargeSlice>;

/**
 * Component for "TimelineLarge" Slices.
 */
const TimelineLarge: FC<TimelineLargeProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);

  const firstTimelineSection = slice.primary.timeline_section[0] && (
    <section className={clsx(moduleStyles.timelineSection, "animated-element")} >
      <PrismicRichText field={slice.primary.timeline_section[0].heading} components={components} />
      <div className={moduleStyles.box} >
        <PrismicRichText field={slice.primary.timeline_section[0].care_list} components={components} />
      </div>
    </section>
  );

  const remainingTimelineSections = slice.primary.timeline_section.map((item, i) => (
    i !== 0 && (
      <section key={`timeline-section-${i}`} className={clsx(moduleStyles.timelineSection, "animated-element")} >
        <PrismicRichText field={item.heading} components={components} />
        <div className={moduleStyles.box} >
          <PrismicRichText field={item.care_list} components={components} />
        </div>
      </section>
    )
  ))
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div className="animated-element">
        <PrismicRichText
          field={slice.primary.main_heading}
          components={components}
        />
      </div>
      <div className={moduleStyles.contentContainer}>
        {firstTimelineSection}
        <PrismicNextImage
          field={slice.primary.graphic}
          className={clsx(moduleStyles.graphic, "animated-element")}
        />
        {remainingTimelineSections}
      </div>
    </Bounded>
  );
};

export default TimelineLarge;
