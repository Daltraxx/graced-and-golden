import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h3" size="sm" className={``}>
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className={``}>
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
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <section>
        <PrismicRichText field={slice.primary.form_heading} />
        <form action="">
          <label htmlFor="name-field">{slice.primary.name_prompt}</label>
          <input type="text" name="name" id="name-field" />

          <label htmlFor="phone-number-field">{slice.primary.phone_number_prompt}</label>
          <input type="text" name="phone-number" id="phone-number-field" />

          <label htmlFor="email-field">{slice.primary.email_prompt}</label>
          <input type="text" name="email" id="email-field" />

          <label htmlFor="birthday-field">{slice.primary.birthday_prompt}</label>
          <input type="text" name="birthday" id="birthday-field" />

          <label htmlFor="instagram-field">{slice.primary.instagram_prompt}</label>
          <input type="text" name="instagram" id="instagram-field" />

          <label htmlFor="occasion-field">{slice.primary.occasion_prompt}</label>
          <input type="text" name="occasion" id="occasion-field" />

          <label htmlFor="how-found-field">{slice.primary.how_you_found_us_prompt}</label>
          <input type="text" name="how-found" id="how-found-field" />

          <label htmlFor="tan-history-field">{slice.primary.tan_history_prompt}</label>
          <input type="text" name="tan-history" id="tan-history-field" />

          <label htmlFor="desired-results-field">{slice.primary.desired_results_prompt}</label>
          <input type="text" name="desired-results" id="desired-results-field" />

          <label htmlFor="questions-concerns-field">{slice.primary.questions_and_concerns_prompt}</label>
          <input type="text" name="questions-concerns" id="questions-concerns-field" />

        </form>
      </section>
    </section>
  );
};

export default Contact;
