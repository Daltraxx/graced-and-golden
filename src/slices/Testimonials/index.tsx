'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/Testimonials/styles.module.css';
import Button from "@/components/Button/Button";
import TestimonialCycler from "@/components/TestimonialCycler/TestimonialCycler";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="manual" className={moduleStyles.heading}>
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => {
    const textWithSurroundingQuotes = [...children];
    textWithSurroundingQuotes.push('"');
    textWithSurroundingQuotes.unshift('"');
    return <p className={moduleStyles.testimonial}>{textWithSurroundingQuotes}</p>
  }
}

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useAddAnimation(containerRef, .5);

  const testimonials = slice.primary.testimonial.map((item, i) => (
    <PrismicRichText field={item.testimonial} components={components} key={`testimonial-${i}`}/>
  ));

  const links = slice.primary.links_1.map((link, i) => {
    return i % 2 === 0 ? 
       <li key={link.key}><Button field={link} color="brown-200" className={moduleStyles.button} /></li>
      : <li key={link.key}><Button field={link} color="brown-500" className={moduleStyles.button} /></li>;
  })
  

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.bounded}
      horizontalSpacing={false}
      verticalPadding={false}
    >
      <div className={moduleStyles.container} ref={containerRef}>
        <section
          className={clsx(
            `${moduleStyles.sliceHalfContainer} animated-element`
          )}
        >
          <section className={`${moduleStyles.linksSection}`}>
            <PrismicRichText
              field={slice.primary.text_1}
              components={components}
            />
            <ul className={moduleStyles.linksRow}>{links}</ul>
          </section>
          <section className={`${moduleStyles.linksSection}`}>
            <PrismicRichText
              field={slice.primary.text_2}
              components={components}
            />
            <Button
              field={slice.primary.links_2}
              color="brown-300"
              className={moduleStyles.button}
            />
          </section>
        </section>
        <div
          style={{ backgroundImage: `url(${slice.primary.center_image.url})` }}
          className={clsx(
            moduleStyles.centerImage,
            "animated-element"
          )}
        ></div>
        <section
          className={clsx(moduleStyles.sliceHalfContainer, "animated-element")}
        >
          <TestimonialCycler testimonials={testimonials} className={moduleStyles.testimonialCycler} />
        </section>
      </div>
    </Bounded>
  );
};

export default Testimonials;
