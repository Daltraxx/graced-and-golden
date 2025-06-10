'use client';

import { FC, useEffect, useState, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/Tryptich/styles.module.css';
import Heading from "@/components/Heading";
import useInView from "@/hooks/useInView";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className={`${moduleStyles.bodyTextParagraph}`}>{children}</p>
  )
  
}

/**
 * Props for `Tryptich`.
 */
export type TryptichProps = SliceComponentProps<Content.TryptichSlice>;

/**
 * Component for "Tryptich" Slices.
 */
const Tryptich: FC<TryptichProps> = ({ slice }) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animatedElements = Array.from(
      containerRef.current.querySelectorAll('.animated-element')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.5 }
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      animatedElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundGradientBrown}`}>
      <div ref={containerRef} className={`${moduleStyles.row}`}>
        <div style={{ backgroundImage: `url(${slice.primary.image_left.url})`}} className={`${moduleStyles.bgImageContainer} animated-element`}></div>
        <div className={`${moduleStyles.bodyContainer} animated-element`}>
          <section className={`${moduleStyles.bodyText}`}>
            <h3 className="mb-2 animated-element">{slice.primary.small_text}</h3>
            <div className='animated-element'><PrismicRichText field={slice.primary.heading} components={components} /></div>
            <div className='animated-element'><PrismicRichText field={slice.primary.body} components={components} /></div>
            <div className='animated-element'><PrismicNextLink field={slice.primary.link} className={`${moduleStyles.bodyTextLink}`}/></div>
            <PrismicNextImage field={slice.primary.body_image} width={418} height={177} className='animated-element'/>
          </section>
        </div>
        <div style={{ backgroundImage: `url(${slice.primary.image_right.url})`}} className={`${moduleStyles.bgImageContainer} animated-element`}></div>
      </div>
    </Bounded>
  );
};

export default Tryptich;
