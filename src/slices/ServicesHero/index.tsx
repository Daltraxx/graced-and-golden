'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import moduleStyles from '@/slices/ServicesHero/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="manual" className="">
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="manual" fontDisplay={false} className="">
      {children}
    </Heading>
  )
}

/**
 * Props for `ServicesHero`.
 */
export type ServicesHeroProps = SliceComponentProps<Content.ServicesHeroSlice>;

/**
 * Component for "ServicesHero" Slices.
 */
const ServicesHero: FC<ServicesHeroProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);
  const backgroundImageURL = slice.primary.background_image.url || "/post-its-mod-min.webp";
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      style={{ backgroundImage: `url(${backgroundImageURL})` }}
      ref={containerRef}
    >
      <div className={clsx(moduleStyles.heroContainer, 'animated-element')} >
        <PrismicNextImage field={slice.primary.main_image} className={moduleStyles.mainImage} />
        <div className={`${moduleStyles.headingContainer} ${moduleStyles.mainHeadingContainer}`} >
          <PrismicRichText field={slice.primary.heading} components={components} />
        </div>
        <div className={`${moduleStyles.headingContainer} ${moduleStyles.subHeadingContainer}`} >
          <PrismicRichText field={slice.primary.sub_heading} components={components} />
        </div>
      </div>
      
    </Bounded>
  );
};

export default ServicesHero;
