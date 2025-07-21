import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import moduleStyles from '@/slices/TrainingBody/styles.module.css';
import clsx from "clsx";
import Button from "@/components/Button/Button";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="md" className='' >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="xs" className='' >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p>{children}</p>
  ),
  list: ({ children }) => (
    <ul className="list-disc">
      {children}
    </ul>
  )
}

/**
 * Props for `TrainingBody`.
 */
export type TrainingBodyProps = SliceComponentProps<Content.TrainingBodySlice>;

/**
 * Component for "TrainingBody" Slices.
 */
const TrainingBody: FC<TrainingBodyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      <section className={clsx(moduleStyles.row, moduleStyles.introRow)} >
        <div className={moduleStyles.box} >
          <PrismicRichText field={slice.primary.intro_paragraph_1} components={components} />
          <div className={moduleStyles.divider} ></div>
          <PrismicRichText field={slice.primary.intro_paragraph_2} components={components} />
        </div>
        <PrismicNextImage field={slice.primary.image} className="" />
      </section>
      <section className={clsx(moduleStyles.row, moduleStyles.includesRow)} >
        <section className={clsx(moduleStyles.box, moduleStyles.includesMainBody)} >
          <PrismicRichText field={slice.primary.includes_heading} components={components} />
          <PrismicRichText field={slice.primary.includes_list} components={components} />
        </section>
        <section className={clsx(moduleStyles.box, moduleStyles.includesSideBar)}>
          <PrismicRichText field={slice.primary.includes_sidebar_heading} components={components} />
          <PrismicRichText field={slice.primary.includes_sidebar_body} components={components} />
        </section>
      </section>
      <div className={moduleStyles.row} >
        <section className={clsx(moduleStyles.box, moduleStyles.detailsBox)} >
          <PrismicRichText field={slice.primary.requirements_heading} components={components} />
          <PrismicRichText field={slice.primary.requirements_body} components={components} />
        </section>
        <section className={clsx(moduleStyles.box, moduleStyles.detailsBox)} >
          <PrismicRichText field={slice.primary.format_and_location_heading} components={components} />
          <PrismicRichText field={slice.primary.format_and_location_details_list} components={components} />
        </section>
        <section className={clsx(moduleStyles.box, moduleStyles.detailsBox)} >
          <PrismicRichText field={slice.primary.booking_and_availability_heading} components={components} />
          <PrismicRichText field={slice.primary.booking_and_availability_body} components={components} />
        </section>
      </div>
      <section className={clsx(moduleStyles.row)} >
        <div className={moduleStyles.box} >
          <PrismicRichText field={slice.primary.link_box_heading} components={components} />
          <PrismicRichText field={slice.primary.link_box_body} components={components} />
          <ul>
            {slice.primary.link.map((link, i) => (
              <li key={link.key}>
                {i % 2 === 0 && <Button field={link} color="brown-300" />}
                {i % 2 !== 0 && <Button field={link} color="brown-700" />}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Bounded>
  );
};

export default TrainingBody;
