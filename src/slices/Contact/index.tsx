'use client';

import { useDebouncedCallback } from "use-debounce";

import { FC, useActionState, useState } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/Contact/styles.module.css';
import styles from '@/styles/styles.module.css'
import Bounded from "@/components/Bounded";
import { sendInquiryEmail, State } from "@/app/lib/actions";
import { handleBirthdayValidation, handleEmailValidation, handleInstagramValidation, handleNameValidation, handleOccasionValidation, handlePhoneNumberValidation, handleHowFoundValidation, handleTanHistoryValidation, handleDesiredResultsValidation, handleQuestionsConcernsValidation, FieldsValidationState } from "@/app/lib/utils/inputValidation";


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
  const [fieldsValidated, setFieldsValidated] = useState<FieldsValidationState>({
    name: {
      valid: false,
      errors: []
    },
    phoneNumber: {
      valid: false,
      errors: []
    },
    email: {
      valid: false,
      errors: []
    },
    birthday: {
      valid: false,
      errors: []
    },
    instagram: {
      valid: false,
      errors: []
    },
    occasion: {
      valid: false,
      errors: []
    },
    howFound: {
      valid: false,
      errors: []
    },
    tanHistory: {
      valid: false,
      errors: []
    },
    desiredResults: {
      valid: false,
      errors: []
    },
    questionsConcerns: {
      valid: true,
      errors: []
    },
    // try to fix hardcoding of below values later
    fieldsValidated: 1,
    totalFields: 10
  });

  const debounceDelay = 400;

  const handleNameChange = useDebouncedCallback(handleNameValidation, debounceDelay);
  const handlePhoneNumberChange = useDebouncedCallback(handlePhoneNumberValidation, debounceDelay);
  const handleEmailChange = useDebouncedCallback(handleEmailValidation, debounceDelay);
  const handleBirthdayChange = useDebouncedCallback(handleBirthdayValidation, debounceDelay);
  const handleInstagramChange = useDebouncedCallback(handleInstagramValidation, debounceDelay);
  const handleOccasionChange = useDebouncedCallback(handleOccasionValidation, debounceDelay);
  const handleHowFoundChange = useDebouncedCallback(handleHowFoundValidation, debounceDelay);
  const handleTanHistoryChange = useDebouncedCallback(handleTanHistoryValidation, debounceDelay);
  const handleDesiredResultsChange = useDebouncedCallback(handleDesiredResultsValidation, debounceDelay);
  const handleQuestionsConcernsChange = useDebouncedCallback(handleQuestionsConcernsValidation, debounceDelay);
  // const handleClick = () => {
  //   console.log(fieldsValidated);
  // }

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <section>
        <PrismicRichText field={slice.primary.form_heading} components={components} />
        {state.message && <div>{state.message}</div>}
        <form action={formAction} className={`${moduleStyles.inquiryForm}`}>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="name-field">{slice.primary.name_prompt}*</label>
            <input
              type="text"
              name="name"
              id="name-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleNameChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="name-error"
            />
            <div id="name-error" aria-live="polite" aria-atomic >
              {fieldsValidated.name.errors.map((errorMessage, i) => (
                <p key={`name-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="phone-number-field">{slice.primary.phone_number_prompt}*</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phone-number-field"
              className={moduleStyles.inquiryField}
              onChange={event => handlePhoneNumberChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="phone-number-error"
            />
            <div id="phone-number-error" aria-live="polite" aria-atomic >
              {fieldsValidated.phoneNumber.errors.map((errorMessage, i) => (
                <p key={`phone-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="email-field">{slice.primary.email_prompt}*</label>
            <input
              type="email"
              name="email"
              id="email-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleEmailChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic >
              {fieldsValidated.email.errors.map((errorMessage, i) => (
                <p key={`email-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="birthday-field">{slice.primary.birthday_prompt}*</label>
            <input
              type="date"
              name="birthday"
              id="birthday-field"
              className={moduleStyles.inquiryField}
              max={new Date().toISOString().slice(0, 10)}
              onChange={event => handleBirthdayChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="birthday-error"
            />
            <div id="birthday-error" aria-live="polite" aria-atomic >
              {fieldsValidated.birthday.errors.map((errorMessage, i) => (
                <p key={`birthday-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="instagram-field">{slice.primary.instagram_prompt}*</label>
            <input
              type="text"
              name="instagram"
              id="instagram-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleInstagramChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="instagram-error"
            />
            <div id="instagram-error" aria-live="polite" aria-atomic >
              {fieldsValidated.instagram.errors.map((errorMessage, i) => (
                <p key={`instagram-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="occasion-field">{slice.primary.occasion_prompt}*</label>
            <textarea
              name="occasion"
              id="occasion-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleOccasionChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="occasion-error"
            />
            <div id="occasion-error" aria-live="polite" aria-atomic >
              {fieldsValidated.occasion.errors.map((errorMessage, i) => (
                <p key={`occasion-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="how-found-field">{slice.primary.how_you_found_us_prompt}*</label>
            <textarea
              name="howFound"
              id="how-found-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleHowFoundChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="how-found-error"
            />
            <div id="how-found-error" aria-live="polite" aria-atomic >
              {fieldsValidated.howFound.errors.map((errorMessage, i) => (
                <p key={`how-found-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="tan-history-field">{slice.primary.tan_history_prompt}*</label>
            <textarea
              name="tanHistory"
              id="tan-history-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleTanHistoryChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="tan-history-error"
            />
            <div id="tan-history-error" aria-live="polite" aria-atomic >
              {fieldsValidated.tanHistory.errors.map((errorMessage, i) => (
                <p key={`history-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="desired-results-field">{slice.primary.desired_results_prompt}*</label>
            <textarea
              name="desiredResults"
              id="desired-results-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleDesiredResultsChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="desired-results-error"
            />
            <div id="desired-results-error" aria-live="polite" aria-atomic >
              {fieldsValidated.desiredResults.errors.map((errorMessage, i) => (
                <p key={`results-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="questions-concerns-field">{slice.primary.questions_and_concerns_prompt}</label>
            <textarea
              name="questionsConcerns"
              id="questions-concerns-field"
              className={moduleStyles.inquiryField}
              onChange={event => handleQuestionsConcernsChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="questions-concerns-error"
            />
            <div id="questions-concerns-error" aria-live="polite" aria-atomic >
              {fieldsValidated.questionsConcerns.errors.map((errorMessage, i) => (
                <p key={`questions-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>
          <button
            type='submit'
            // disabled={fieldsValidated.fieldsValidated !== fieldsValidated.totalFields}
            className={`${styles.button} ${styles.buttonBrown800}`}
          >
          Submit
          </button>
        </form>
      </section>
    </Bounded>
  );
};

export default Contact;
