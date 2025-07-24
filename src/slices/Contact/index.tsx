import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/Contact/styles.module.css';
import Bounded from "@/components/Bounded";
import InquiryForm from "@/components/InquiryForm/InquiryForm";


const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h3" size="sm" className={``}>
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className={`mb-4`}>
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="">{children}</p>
  )
}

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */

const Contact: FC<ContactProps> = ({ slice }) => {

  return (
    <Bounded 
      data-slice-type={slice.slice_type} 
      data-slice-variation={slice.variation} 
      className={moduleStyles.boundedContainer}
    >
      <section className={moduleStyles.formContainer} >
        <PrismicRichText field={slice.primary.form_heading} components={components} />
        <InquiryForm slice={slice} index={0} slices={[]} context={undefined} />
      </section>
      <section>
        <PrismicRichText field={slice.primary.contact_info_heading} components={components} />
        <PrismicRichText field={slice.primary.contact_info_body} components={components} />
      </section>
      <section>
        <PrismicRichText field={slice.primary.location_and_hours_heading} components={components} />
        <PrismicRichText field={slice.primary.location_description} components={components} />
        <PrismicRichText field={slice.primary.location_addendum} components={components} />
      </section>
    </Bounded>
  );
};

export default Contact;
