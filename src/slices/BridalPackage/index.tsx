'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/BridalPackage/styles.module.css';
import altStyles from '@/slices/BridalPackage/simpleTwoColumnStyles.module.css';
import Bounded from "@/components/Bounded";
import BridalPackageCard from "@/components/BridalPackageCard/BridalPackageCard";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button/Button";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="lg" >
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p>{children}</p>
  ),
}

/**
 * Props for `BridalPackage`.
 */
export type BridalPackageProps =
  SliceComponentProps<Content.BridalPackageSlice>;

/**
 * Component for "BridalPackage" Slices.
 */
const BridalPackage: FC<BridalPackageProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);
  
  if (slice.variation === 'default') {
    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={moduleStyles.boundedContainer}
        ref={containerRef}
      >
        <div className={moduleStyles.contentContainer}>
          <section
            className={clsx(
              moduleStyles.cardContainer,
              moduleStyles.explainerContainer,
              "animated-element"
            )}
          >
            <PrismicRichText
              field={slice.primary.package_name}
              components={components}
            />
            <div className={moduleStyles.explainerTextContainer}>
              <PrismicRichText
                field={slice.primary.package_body_text}
                components={components}
              />
            </div>
          </section>
          <BridalPackageCard
            slice={slice}
            className={clsx(moduleStyles.cardContainer, "animated-element")}
            index={0}
            slices={[]}
            context={undefined}
          />
        </div>
      </Bounded>
    );
  } else {
    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={altStyles.boundedContainer}
        ref={containerRef}
      >
        <PrismicNextImage field={slice.primary.image} />
        <section>
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.name_and_price} />
          <PrismicRichText field={slice.primary.description} />
          <Button field={slice.primary.booking_link} color="brown-200" />
        </section>
      </Bounded>
    );
  }
};

export default BridalPackage;
