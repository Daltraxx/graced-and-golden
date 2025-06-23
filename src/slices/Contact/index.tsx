'use client';

import { FC, useActionState, useState } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/Contact/styles.module.css';
import styles from '@/styles/styles.module.css'
import Bounded from "@/components/Bounded";
import { sendInquiryEmail, State } from "@/app/lib/actions";


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
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(sendInquiryEmail, initialState);
  const [fieldsValidated, setFieldsValidated] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    birthday: false,
    instagram: false,
    occasion: false,
    howFound: false,
    tanHistory: false,
    desiredResults: false,
  });


  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <section>
        <PrismicRichText field={slice.primary.form_heading} components={components} />
        <form action={formAction} className={`${moduleStyles.inquiryForm}`}>
          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="name-field">{slice.primary.name_prompt + '*'}</label>
            <input type="text" name="name" id="name-field" className={`${moduleStyles.inquiryField}`} required pattern="^[a-zA-Z]+(([',.\\-\\ ][a-zA-Z ])?[a-zA-Z]*)*$" title="Please enter a valid name."/>
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="phone-number-field">{slice.primary.phone_number_prompt + '*'}</label>
            <input type="tel" name="phoneNumber" id="phone-number-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="email-field">{slice.primary.email_prompt + '*'}</label>
            <input type="email" name="email" id="email-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="birthday-field">{slice.primary.birthday_prompt + '*'}</label>
            <input type="date" name="birthday" id="birthday-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="instagram-field">{slice.primary.instagram_prompt + '*'}</label>
            <input type="text" name="instagram" id="instagram-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="occasion-field">{slice.primary.occasion_prompt + '*'}</label>
            <textarea name="occasion" id="occasion-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="how-found-field">{slice.primary.how_you_found_us_prompt + '*'}</label>
            <textarea name="howFound" id="how-found-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="tan-history-field">{slice.primary.tan_history_prompt + '*'}</label>
            <textarea name="tanHistory" id="tan-history-field" className={`${moduleStyles.inquiryField}`} required />
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="desired-results-field">{slice.primary.desired_results_prompt + '*'}</label>
            <textarea name="desiredResults" id="desired-results-field" className={`${moduleStyles.inquiryField}`} required minLength={5}/>
          </div>

          <div className={`${moduleStyles.fieldContainer}`}>
            <label htmlFor="questions-concerns-field">{slice.primary.questions_and_concerns_prompt}</label>
            <textarea name="questionsConcerns" id="questions-concerns-field" className={`${moduleStyles.inquiryField}`}/>
          </div>
          <button type='submit' className={`${styles.button} ${styles.buttonBrown800}`}>Submit</button>
        </form>
      </section>
    </Bounded>
  );
};

export default Contact;
