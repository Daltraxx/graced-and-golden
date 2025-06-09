'use client';

import { FC, useEffect } from "react";
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
  
  const [elementRef, isInView] = useInView({ threshold: .4 });

  useEffect(() => {
    if (isInView) {
      document.querySelector('.animated-element')?.classList.add('fade-in');
    }
  }, [isInView])

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundGradientBrown}`}>
      <div ref={elementRef} className={`${moduleStyles.row} animated-element`}>
        <div style={{ backgroundImage: `url(${slice.primary.image_left.url})`}} className={`${moduleStyles.bgImageContainer}`}></div>
        <div className={`${moduleStyles.bodyContainer}`}>
          <section className={`${moduleStyles.bodyText}`}>
            <h3 className="mb-2">{slice.primary.small_text}</h3>
            <PrismicRichText field={slice.primary.heading} components={components} />
            <PrismicRichText field={slice.primary.body} components={components} />
            <PrismicNextLink field={slice.primary.link} className={`${moduleStyles.bodyTextLink}`}/>
            <PrismicNextImage field={slice.primary.body_image} width={418} height={177}/>
          </section>
        </div>
        <div style={{ backgroundImage: `url(${slice.primary.image_right.url})`}} className={`${moduleStyles.bgImageContainer}`}></div>
      </div>
    </Bounded>
  );
};

export default Tryptich;
