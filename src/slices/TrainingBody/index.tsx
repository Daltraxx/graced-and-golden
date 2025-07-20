import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

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
    >
      <PrismicRichText field={slice.primary.main_heading} />
      <section>
        <div>
          <PrismicRichText field={slice.primary.intro_paragraph_1} />
          <PrismicRichText field={slice.primary.intro_paragraph_2} />
        </div>
        <PrismicNextImage field={slice.primary.image} />
      </section>
      <section>
        <section>
          <PrismicRichText field={slice.primary.includes_heading} />
          <PrismicRichText field={slice.primary.includes_list} />
        </section>
        <section>
          <PrismicRichText
            field={slice.primary.includes_sidebar_heading}
          />
          <PrismicRichText
            field={slice.primary.includes_sidebar_body}
          />
        </section>
      </section>
      <div>
        <section>
          <PrismicRichText
            field={slice.primary.requirements_heading}
          />
          <PrismicRichText field={slice.primary.requirements_body} />
        </section>
        <section>
          <PrismicRichText
            field={slice.primary.format_and_location_heading}
          />
          <PrismicRichText
            field={slice.primary.format_and_location_details_list}
          />
        </section>
        <section>
          <PrismicRichText
            field={slice.primary.booking_and_availability_heading}
          />
          <PrismicRichText
            field={slice.primary.booking_and_availability_body}
          />
        </section>
      </div>
      <section>
        <PrismicRichText field={slice.primary.link_box_heading} />
        <PrismicRichText field={slice.primary.link_box_body} />
        {slice.primary.link.map((link) => (
          <PrismicNextLink
            key={link.key}
            field={link}
          />
        ))}
      </section>
    </Bounded>
  );
};

export default TrainingBody;
