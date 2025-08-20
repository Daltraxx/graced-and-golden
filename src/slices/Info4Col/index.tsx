'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/Info4Col/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="manual" className={moduleStyles.mainHeading} font="cursive" >
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" >
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p>{children}</p>
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
          field={slice.primary.main_heading}
          components={components}
        />
      </div>
      <div className={moduleStyles.boxesContainer}>
        {slice.primary.column.map((item, i) => (
          <section
            className={clsx(moduleStyles.box, "animated-element")}
            key={`info-col-${i}`}
          >
            <PrismicRichText field={item.heading} components={components} />
            <PrismicRichText field={item.body_text} components={components} />
          </section>
        ))}
      </div>
    </Bounded>
  );
};

export default Info4Col;
