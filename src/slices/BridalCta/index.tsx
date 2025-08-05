'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";
import Heading from "@/components/Heading";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/BridalCta/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className='' >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mb-2 lg:mb-4">{children}</p>
  )
}

/**
 * Props for `BridalCta`.
 */
export type BridalCtaProps = SliceComponentProps<Content.BridalCtaSlice>;

/**
 * Component for "BridalCta" Slices.
 */
const BridalCta: FC<BridalCtaProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef, .5);
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        moduleStyles.container,
        slice.variation === "default" && styles.backgroundBrown500,
        slice.variation === "light" && styles.backgroundBeige300
      )}
      horizontalSpacing={false}
      ref={containerRef}
    >
      <div className={`${moduleStyles.rowContainer}`}>
        <PrismicNextImage
          field={slice.primary.image_left}
          className={`${moduleStyles.ctaImage} ${moduleStyles.box} animated-element`}
        />
        <div
          className={clsx(
            moduleStyles.ctaContentContainer,
            slice.variation === "default" &&
              moduleStyles.ctaContentContainerDefault,
            slice.variation === "light" &&
              moduleStyles.ctaContentContainerLight,
            moduleStyles.box,
            "animated-element"
          )}
        >
          <div className={`${moduleStyles.ctaTextContentContainer}`}>
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.body}
              components={components}
            />
            <Button
              field={slice.primary.bridal_page_link}
              color="cream-200"
              className={clsx(
                moduleStyles.button,
                slice.variation === "default" && moduleStyles.buttonDefault
              )}
            />
          </div>
        </div>
        <PrismicNextImage
          field={slice.primary.image_right}
          className={`${moduleStyles.ctaImage} ${moduleStyles.box} animated-element`}
        />
      </div>
    </Bounded>
  );
};

export default BridalCta;
