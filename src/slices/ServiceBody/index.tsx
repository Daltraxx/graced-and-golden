import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className='' >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="sm" className='' >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading as="h5" size="sm" className='' >
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
 * Props for `ServiceBody`.
 */
export type ServiceBodyProps = SliceComponentProps<Content.ServiceBodySlice>;

/**
 * Component for "ServiceBody" Slices.
 */
const ServiceBody: FC<ServiceBodyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      <div>
        <section>
          <PrismicRichText field={slice.primary.description_heading} components={components} />
          <PrismicRichText field={slice.primary.description_body} components={components} />
        </section>
        <section>
          <PrismicRichText field={slice.primary.includes_heading} components={components} />
          <PrismicRichText field={slice.primary.includes_list} components={components} />
        </section>
        <section>
          <PrismicRichText field={slice.primary.additional_details_heading} components={components} />
          <PrismicRichText field={slice.primary.additional_details_body} components={components} />
        </section>
      </div>
      <div>
        <section>
          <PrismicRichText field={slice.primary.price} components={components} />
          <PrismicRichText field={slice.primary.deposit} components={components} />
          <PrismicRichText field={slice.primary.duration} components={components} />
          <Button field={slice.primary.booking_link} />
        </section>
        <section>
          <PrismicRichText field={slice.primary.further_information_heading} components={components} />
          <Button field={slice.primary.inquiry_link} />
        </section>
      </div>
    </Bounded>
  );
};

export default ServiceBody;
