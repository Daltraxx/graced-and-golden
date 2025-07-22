import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";
import moduleStyles from '@/slices/ServiceBody/styles.module.css';
import clsx from 'clsx';

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
      className={moduleStyles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      <div className={moduleStyles.mainContentContainer} >

        <div className={clsx(moduleStyles.row, moduleStyles.detailsRow)} >
          <section className={moduleStyles.box} >
            <div className={moduleStyles.boxHeadingContainer} >
              <PrismicRichText field={slice.primary.description_heading} components={components} />
            </div>
            <PrismicRichText field={slice.primary.description_body} components={components} />
          </section>
          <section className={clsx(moduleStyles.box, moduleStyles.includesBox)} >
            <div className={moduleStyles.boxHeadingContainer} >
              <PrismicRichText field={slice.primary.includes_heading} components={components} />
            </div>
            <PrismicRichText field={slice.primary.includes_list} components={components} />
          </section>
          <section className={moduleStyles.box} >
            <div className={moduleStyles.boxHeadingContainer} >
              <PrismicRichText field={slice.primary.additional_details_heading} components={components} />
            </div>
            <PrismicRichText field={slice.primary.additional_details_body} components={components} />
          </section>
        </div>

        <div className={moduleStyles.row} >
          <section className={moduleStyles.bookingDetailsContainer} >
            <div className={clsx(moduleStyles.box, moduleStyles.bookingDetailsBox)} >
              <PrismicRichText field={slice.primary.price} components={components} />
              <PrismicRichText field={slice.primary.deposit} components={components} />
              <PrismicRichText field={slice.primary.duration} components={components} />
            </div>
            <Button field={slice.primary.booking_link} color="brown-500" className={moduleStyles.button} />
          </section>
          <section className={moduleStyles.contactContainer} >
            <div className={moduleStyles.contactHeadingContainer} >
              <PrismicRichText field={slice.primary.further_information_heading} components={components} />
            </div>
            <div className={moduleStyles.contactButtonContainer} >
              <Button field={slice.primary.inquiry_link} color="brown-300" className={moduleStyles.button} />
            </div>
          </section>
        </div>

      </div>
    </Bounded>
  );
};

export default ServiceBody;
