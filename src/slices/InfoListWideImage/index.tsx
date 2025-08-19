'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/InfoListWideImage/styles.module.css'
import useAddAnimation from "@/utilities/addAnimation";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="manual" font="cursive" >
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="manual" font="cursive" >
        {children}
    </Heading>
  ),
  list: ({children}) => (
    <ul className={`${moduleStyles.list}`}>{children}</ul>
  )
  
}

/**
 * Props for `InfoListWideImage`.
 */
export type InfoListWideImageProps =
  SliceComponentProps<Content.InfoListWideImageSlice>;

/**
 * Component for "InfoListWideImage" Slices.
 */
const InfoListWideImage: FC<InfoListWideImageProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${moduleStyles.boundedContainer}`}
      ref={containerRef}
    >
      <div className={`${moduleStyles.row}`}>
        <div
          style={{
            backgroundImage: `url(${slice.primary.background_image.url})`,
          }}
          className={`${moduleStyles.leftContainer}`}
        >
          <div className="animated-element">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
          </div>
        </div>
        <div className={`${moduleStyles.rightContainer}`}>
          <div className="animated-element">
            <PrismicRichText
              field={slice.primary.list}
              components={components}
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default InfoListWideImage;
