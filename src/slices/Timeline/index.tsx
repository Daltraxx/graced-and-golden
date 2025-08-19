'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import moduleStyles from '@/slices/Timeline/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" >
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="md" >
        {children}
    </Heading>
  ),
  heading4: ({children}) => (
    <Heading as="h4" size="xs" >
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p>{children}</p>
  ),
}

/**
 * Props for `Timeline`.
 */
export type TimelineProps = SliceComponentProps<Content.TimelineSlice>;

/**
 * Component for "Timeline" Slices.
 */
const Timeline: FC<TimelineProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      horizontalSpacing={false}
      ref={containerRef}
    >
      <div className="animated-element">
        <PrismicRichText
          field={slice.primary.heading}
          components={components}
        />
      </div>
      <section className={moduleStyles.timelineContainer}>
        <ol className={moduleStyles.timelineList}>
          {slice.primary.timeline.map((item, i) => (
            <li key={`timeline-item-${i}`}>
              <section
                className={clsx(moduleStyles.timelineItem, "animated-element")}
              >
                <PrismicNextImage field={item.icon_image} />
                <div className={moduleStyles.timelineTextContainer}>
                  <div className={moduleStyles.timelineHeadingContainer}>
                    <span>{i + 1}.</span>
                    <PrismicRichText field={item.item_heading} />
                  </div>
                  <PrismicRichText
                    field={item.text_body}
                    components={components}
                  />
                </div>
              </section>
            </li>
          ))}
        </ol>
      </section>
    </Bounded>
  );
};

export default Timeline;
