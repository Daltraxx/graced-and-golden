'use client';

import { FC, type ReactNode, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import moduleStyles from '@/slices/Tryptich/styles.module.css';
import Heading from "@/components/Heading";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" font="display" >
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
  useAddAnimation(containerRef, .5);

  const getHeadingTextWithBreak = (text: string, placement = 2): ReactNode => {
    const normalized = (text ?? "").toString().trim();
    if (!normalized) return "";
    if (normalized.toLowerCase() === 'welcome to graced and golden') {
      const words = normalized.split(" ");
      return [
        words.slice(0, placement).join(" "),
        <br key="break" />,
        words.slice(placement).join(" "),
      ];
    }

    return normalized;
  }


  const headingRaw = slice.primary.heading;
  const heading = (headingRaw ?? "").toString().trim() || "Welcome to Graced and Golden";
  const headingWithBreak = getHeadingTextWithBreak(heading);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${moduleStyles.triptychContainer}`}
    >
      <div ref={containerRef} className={`${moduleStyles.row}`}>
        <div
          style={{ backgroundImage: `url(${slice.primary.image_left.url})` }}
          className={clsx(moduleStyles.bgImageContainer, "animated-element")}
        ></div>
        <div className={`${moduleStyles.bodyContainer}`}>
          <section className={`${moduleStyles.bodyText}`}>
            <p className="mb-2 animated-element">{slice.primary.small_text}</p>
            <div className="animated-element">
              <Heading as="h2" size="md" font="display" className={moduleStyles.heading}>
                {headingWithBreak}
              </Heading>
              <div className={moduleStyles.divider} role="separator"></div>
            </div>
            <div className="animated-element">
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
            <div className="animated-element">
              <PrismicNextLink
                field={slice.primary.link}
                className={moduleStyles.bodyTextLink}
              />
            </div>
            <PrismicNextImage
              field={slice.primary.body_image}
              width={610}
              height={380}
              className="animated-element"
            />
          </section>
        </div>
        <div
          style={{ backgroundImage: `url(${slice.primary.image_right.url})` }}
          className={clsx(
            moduleStyles.bgImageContainer,
            "animated-element"
          )}
        ></div>
      </div>
    </Bounded>
  );
};

export default Tryptich;
