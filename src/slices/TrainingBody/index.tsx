"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import moduleStyles from "@/slices/TrainingBody/styles.module.css";
import clsx from "clsx";
import Button from "@/components/Button/Button";
import useAddAnimation from "@/utilities/addAnimation";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="lg">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="xs">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
  list: ({ children }) => <ul className="list-disc">{children}</ul>,
};

/**
 * Props for `TrainingBody`.
 */
export type TrainingBodyProps = SliceComponentProps<Content.TrainingBodySlice>;

/**
 * Component for "TrainingBody" Slices.
 */
const TrainingBody: FC<TrainingBodyProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  useAddAnimation(containerRef);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div className="animated-element">
        <PrismicRichText
          field={slice.primary.main_heading}
          components={components}
        />
      </div>

      <section className={clsx(moduleStyles.row, moduleStyles.introRow)}>
        <div
          className={clsx(
            moduleStyles.box,
            moduleStyles.introBox,
            !slice.primary.intro_paragraph_2.length && "text-center md:text-xl",
            "animated-element"
          )}
        >
          <PrismicRichText
            field={slice.primary.intro_paragraph_1}
            components={components}
          />
          {slice.primary.intro_paragraph_2.length > 0 && (
            <div className={clsx(moduleStyles.divider)}></div>
          )}
          <PrismicRichText
            field={slice.primary.intro_paragraph_2}
            components={components}
          />
        </div>
        <div className={"animated-element"}>
          <PrismicNextImage
            field={slice.primary.image}
            height={778}
            width={778}
          />
        </div>
      </section>

      <section
        className={clsx(
          moduleStyles.row,
          moduleStyles.includesRow,
          "animated-element"
        )}
      >
        <section
          className={clsx(moduleStyles.box, moduleStyles.includesMainBody)}
        >
          <PrismicRichText
            field={slice.primary.includes_heading}
            components={components}
          />
          <PrismicRichText
            field={slice.primary.includes_list}
            components={components}
          />
        </section>
        <section
          className={clsx(moduleStyles.box, moduleStyles.includesSideBar)}
        >
          <PrismicRichText
            field={slice.primary.includes_sidebar_heading}
            components={components}
          />
          <div className={moduleStyles.includesSideBarBodyText}>
            <PrismicRichText
              field={slice.primary.includes_sidebar_body}
              components={components}
            />
          </div>
        </section>
      </section>

      <div className={clsx(moduleStyles.row, moduleStyles.detailsRow)}>
        <section
          className={clsx(
            moduleStyles.box,
            moduleStyles.detailsBox,
            "animated-element"
          )}
        >
          <PrismicRichText
            field={slice.primary.requirements_heading}
            components={components}
          />
          <div>
            <PrismicRichText
              field={slice.primary.requirements_body}
              components={components}
            />
          </div>
        </section>
        <section
          className={clsx(
            moduleStyles.box,
            moduleStyles.detailsBox,
            "animated-element"
          )}
        >
          <PrismicRichText
            field={slice.primary.format_and_location_heading}
            components={components}
          />
          <div className={moduleStyles.detailsBody}>
            <PrismicRichText
              field={slice.primary.format_and_location_details_list}
              components={components}
            />
          </div>
        </section>
        <section
          className={clsx(
            moduleStyles.box,
            moduleStyles.detailsBox,
            "animated-element"
          )}
        >
          <PrismicRichText
            field={slice.primary.booking_and_availability_heading}
            components={components}
          />
          <div className={moduleStyles.detailsBody}>
            <PrismicRichText
              field={slice.primary.booking_and_availability_body}
              components={components}
            />
          </div>
        </section>
      </div>

      <section
        className={clsx(
          moduleStyles.row,
          moduleStyles.linksRow,
          "animated-element"
        )}
      >
        <div className={clsx(moduleStyles.box)}>
          <PrismicRichText
            field={slice.primary.link_box_heading}
            components={components}
          />
          <PrismicRichText
            field={slice.primary.link_box_body}
            components={components}
          />
          <ul className={moduleStyles.linksList}>
            {slice.primary.link.map((link, i) => (
              <li key={link.key}>
                {i % 2 === 0 && (
                  <Button
                    field={link}
                    color="brown-300"
                    className={moduleStyles.button}
                  />
                )}
                {i % 2 !== 0 && (
                  <Button
                    field={link}
                    color="brown-700"
                    className={moduleStyles.button}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Bounded>
  );
};

export default TrainingBody;
