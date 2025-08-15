'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/SimpleHero/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="manual" >
      {children}
    </Heading>
  )
}

/**
 * Props for `SimpleHero`.
 */
export type SimpleHeroProps = SliceComponentProps<Content.SimpleHeroSlice>;

/**
 * Component for "SimpleHero" Slices.
 */
const SimpleHero: FC<SimpleHeroProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);

  const backgroundImageURL =
    slice.primary.background_image.url || "/bridal-mags-reduce-dark-min.webp";
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
        className={moduleStyles.heroContainer}
      >
        <div className={clsx(moduleStyles.textContainer, "animated-element")}>
          <PrismicRichText
            field={slice.primary.main_heading}
            components={components}
          />
          <PrismicRichText
            field={slice.primary.sub_heading}
            components={components}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default SimpleHero;
