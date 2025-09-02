'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";
import { PrismicNextImage } from "@prismicio/next";
import moduleStyles from '@/slices/About/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="manual" >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="manual" font="cursive">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="manual" font="cursive" >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
};

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef, 0.3);
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      horizontalSpacing={false}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div className="animated-element" >
        <PrismicRichText field={slice.primary.main_heading} components={components} />
      </div>
      <div className={moduleStyles.contentContainer} >
        <section className={clsx(moduleStyles.textContainer)} >
          <div className="animated-element" >
            <PrismicRichText field={slice.primary.text_heading} components={components} /></div>
          <div className={moduleStyles.paragraphsContainer}>
            <div className={clsx(moduleStyles.paragraphColumn, 'animated-element')}>
              <PrismicRichText field={slice.primary.text_column_1} components={components} />
            </div>
            <div className={clsx(moduleStyles.paragraphColumn, 'animated-element')} >
              <PrismicRichText field={slice.primary.text_column_2} components={components} />
              <Button field={slice.primary.link} color="cream-200" className={moduleStyles.button} />
            </div>
          </div>
        </section>
        <div className={clsx(moduleStyles.imageContainer, 'animated-element')} >
          <PrismicNextImage field={slice.primary.front_image} className={moduleStyles.frontImage} />
          <PrismicNextImage field={slice.primary.back_image} className={moduleStyles.backImage} />
        </div>
      </div>
    </Bounded>
  );
};

export default About;
