import { FC } from "react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/Contact/styles.module.css';
import Bounded from "@/components/Bounded";
import InquiryForm from "@/components/InquiryForm/InquiryForm";
import clsx from "clsx";


const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h3" size="sm" className={``}>
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className={moduleStyles.heading} >
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

const Contact: FC<ContactProps> = async({ slice }) => {
  const client = createClient();
  const contactInfo = await client.getSingle('contact_information');
  const data = contactInfo.data;
  const defaultGoogleMapsUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7820.409499663499!2d-117.01222026959748!3d32.84526426836105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dbfd430478fef3%3A0x1013354d0c73530a!2sSantee%20Recreational%20Lakes!5e0!3m2!1sen!2sus!4v1753384381969!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen=';

  return (
    <Bounded 
      data-slice-type={slice.slice_type} 
      data-slice-variation={slice.variation} 
      className={moduleStyles.boundedContainer}
      verticalPadding={false}
    >
      <div className={moduleStyles.mainContentContainer} >

        <section className={moduleStyles.formContainer} >
          <PrismicRichText field={slice.primary.form_heading} components={components} />
          <InquiryForm slice={slice} index={0} slices={[]} context={undefined} />
        </section>

        <div className={moduleStyles.rightColumn} >
          <section className={clsx(moduleStyles.contactContainer)} >
            <PrismicRichText field={slice.primary.contact_info_heading} components={components} />
            <div className={moduleStyles.box}>
              <PrismicRichText field={slice.primary.contact_info_body} components={components} />
              <div className={moduleStyles.infoText} >
                <p><strong>Email:</strong><span>{' '}{data.email}</span></p>
                {/* Add accessibility */}
                <p><strong>Instagram:</strong>{' '}<a href={`${data.instagram_link}`} target="_blank" >{data.instagram_handle}</a></p>
              </div>
            </div>
          </section>

          <section className={clsx(moduleStyles.locationContainer)} > 
            <PrismicRichText field={slice.primary.location_and_hours_heading} components={components} />
            <div className={moduleStyles.box} >
              <div className={moduleStyles.infoText} >
                <PrismicRichText field={slice.primary.location_description} components={components} />
                <PrismicRichText field={slice.primary.hours_description} />
              </div>
              <iframe
                src={data.google_maps_embed_url || defaultGoogleMapsUrl}
                className={moduleStyles.googleMapsIFrame}
                title="Google Maps I-Frame of Santee Lakes Area in Santee, San Diego, California"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <PrismicRichText field={slice.primary.location_addendum} components={components} />
            </div>
          </section>
        </div>

      </div>
    </Bounded>
  );
};

export default Contact;
