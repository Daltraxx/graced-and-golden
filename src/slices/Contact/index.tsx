'use client';

import { useDebouncedCallback } from "use-debounce";
import { SetStateAction, use, useEffect } from "react";

import { FC, useActionState, useState } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/Contact/styles.module.css';
import styles from '@/styles/styles.module.css'
import Bounded from "@/components/Bounded";
import { sendInquiryEmail, State } from "@/app/lib/actions";
import { handleBirthdayValidation, handleEmailValidation, handleInstagramValidation, handleNameValidation, handleOccasionValidation, handlePhoneNumberValidation, handleHowFoundValidation, handleTanHistoryValidation, handleDesiredResultsValidation, handleQuestionsConcernsValidation, FieldState } from "@/app/lib/utils/inputValidation";
import { set } from "zod/v4";


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
  const [inquiryState, formAction] = useActionState(sendInquiryEmail, initialState);
  const getSessionValue = (key: string): string => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(key) || '';
    }
    return '';
  };

  // Field States
  const [name, setName] = useState<FieldState>({
    value: getSessionValue('name'),
    valid: false,
    validationHandler: handleNameValidation,
    errors: []
  });
  const [phoneNumber, setPhoneNumber] = useState<FieldState>({
    value: getSessionValue('phoneNumber'),
    valid: false,
    validationHandler: handlePhoneNumberValidation,
    errors: []
  });
  const [email, setEmail] = useState<FieldState>({
    value: getSessionValue('email'),
    valid: false,
    validationHandler: handleEmailValidation,
    errors: []
  });
  const [birthday, setBirthday] = useState<FieldState>({
    value: getSessionValue('birthday'),
    valid: false,
    validationHandler: handleBirthdayValidation,
    errors: []
  });
  const [instagram, setInstagram] = useState<FieldState>({
    value: getSessionValue('instagram'),
    valid: false,
    validationHandler: handleInstagramValidation,
    errors: []
  });
  const [occasion, setOccasion] = useState<FieldState>({
    value: getSessionValue('occasion'),
    valid: false,
    validationHandler: handleOccasionValidation,
    errors: []
  });
  const [howFound, setHowFound] = useState<FieldState>({
    value: getSessionValue('howFound'),
    valid: false,
    validationHandler: handleHowFoundValidation,
    errors: []
  });
  const [tanHistory, setTanHistory] = useState<FieldState>({
    value: getSessionValue('tanHistory'),
    valid: false,
    validationHandler: handleTanHistoryValidation,
    errors: []
  });
  const [desiredResults, setDesiredResults] = useState<FieldState>({
    value: getSessionValue('desiredResults'),
    valid: false,
    validationHandler: handleDesiredResultsValidation,
    errors: []
  });
  const [questionsConcerns, setQuestionsConcerns] = useState<FieldState>({
    value: getSessionValue('questionsConcerns'),
    valid: true,
    validationHandler: handleQuestionsConcernsValidation,
    errors: []
  });

  const [allFieldsValidated, setAllFieldsValidated] = useState(false);
  const fieldStates = [name, phoneNumber, email, birthday, instagram, occasion, howFound, tanHistory, desiredResults, questionsConcerns];
  const fieldStateSetters = [setName, setPhoneNumber, setEmail, setBirthday, setInstagram, setOccasion, setHowFound, setTanHistory, setDesiredResults, setQuestionsConcerns];

  // If values present from session storage upon mounting, handle validation
  useEffect(() => {
    fieldStates.forEach((_, i) => {
      const state = fieldStates[i];
      const setter = fieldStateSetters[i];
      if (state.value) state.validationHandler(state.value, setter);
    })
  }, [])
  // Handle input changes, validation, and session storage
  const debounceDelay = 300;

  const debouncedStorage = useDebouncedCallback((key: string, value: string) => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem(key, value);
      }
  }, debounceDelay);

  const debouncedNameValidation = useDebouncedCallback(handleNameValidation, debounceDelay);
  
  const handleNameChange = ({ target }: { target: HTMLInputElement }) => {
    setName(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedNameValidation(target.value, setName);
  };

  const debouncedPhoneNumberValidation = useDebouncedCallback(handlePhoneNumberValidation, debounceDelay);
  const handlePhoneNumberChange = ({ target }: { target: HTMLInputElement }) => {
    setPhoneNumber(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedPhoneNumberValidation(target.value, setPhoneNumber);
  };

  const debouncedEmailValidation = useDebouncedCallback(handleEmailValidation, debounceDelay);
  const handleEmailChange = ({ target }: { target: HTMLInputElement }) => {
    setEmail(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedEmailValidation(target.value, setEmail);
  };

  const debouncedBirthdayValidation = useDebouncedCallback(handleBirthdayValidation, debounceDelay);
  const handleBirthdayChange = ({ target }: { target: HTMLInputElement }) => {
    setBirthday(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedBirthdayValidation(target.value, setBirthday);
    debouncedStorage(target.name, target.value);
  };

  const debouncedInstagramValidation = useDebouncedCallback(handleInstagramValidation, debounceDelay);
  const handleInstagramChange = ({ target }: { target: HTMLInputElement }) => {
    setInstagram(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedInstagramValidation(target.value, setInstagram);
    debouncedStorage(target.name, target.value);
  };

  const debouncedOccasionValidation = useDebouncedCallback(handleOccasionValidation, debounceDelay);
  const handleOccasionChange = ({ target }: { target: HTMLTextAreaElement }) => {
    setOccasion(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedOccasionValidation(target.value, setOccasion);
    debouncedStorage(target.name, target.value);
  };

  const debouncedHowFoundValidation = useDebouncedCallback(handleHowFoundValidation, debounceDelay);
  const handleHowFoundChange = ({ target }: { target: HTMLTextAreaElement }) => {
    setHowFound(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedHowFoundValidation(target.value, setHowFound);
    debouncedStorage(target.name, target.value);
  };

  const debouncedTanHistoryValidation = useDebouncedCallback(handleTanHistoryValidation, debounceDelay);
  const handleTanHistoryChange = ({ target }: { target: HTMLTextAreaElement }) => {
    setTanHistory(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedTanHistoryValidation(target.value, setTanHistory);
    debouncedStorage(target.name, target.value);
  };

  const debouncedDesiredResultsValidation = useDebouncedCallback(handleDesiredResultsValidation, debounceDelay);
  const handleDesiredResultsChange = ({ target }: { target: HTMLTextAreaElement }) => {
    setDesiredResults(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedDesiredResultsValidation(target.value, setDesiredResults);
    debouncedStorage(target.name, target.value);
  };

  const debouncedQuestionsConcernsValidation = useDebouncedCallback(handleQuestionsConcernsValidation, debounceDelay);
  const handleQuestionsConcernsChange = ({ target }: { target: HTMLTextAreaElement }) => {
    setQuestionsConcerns(prev => ({
      ...prev,
      value: target.value,
    }));
    debouncedQuestionsConcernsValidation(target.value, setQuestionsConcerns);
    debouncedStorage(target.name, target.value);
  };
  
  // Selectively sync some fields to session storage to handle autofill
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('name', name.value);
      sessionStorage.setItem('phoneNumber', phoneNumber.value);
      sessionStorage.setItem('email', email.value);
    }
  }, [name, phoneNumber, email]);

  // const handleClick = () => {
  //   console.log(fieldsValidated);
  // }

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <section>
        <PrismicRichText field={slice.primary.form_heading} components={components} />
        <form action={formAction} className={`${moduleStyles.inquiryForm}`} aria-describedby="form-error" >

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="name-field">{slice.primary.name_prompt}*</label>
            <input
              type="text"
              name="name"
              id="name-field"
              value={name.value}
              onChange={handleNameChange}
              className={moduleStyles.inquiryField}
              // onChange={event => handleNameChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="name-error"
            />
            <div id="name-error" aria-live="polite" aria-atomic >
              {name.errors.map((errorMessage, i) => (
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
              value={phoneNumber.value}
              className={moduleStyles.inquiryField}
              onChange={handlePhoneNumberChange}
              aria-describedby="phone-number-error"
            />
            <div id="phone-number-error" aria-live="polite" aria-atomic >
              {phoneNumber.errors.map((errorMessage, i) => (
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
              value={email.value}
              className={moduleStyles.inquiryField}
              onChange={handleEmailChange}
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic >
              {email.errors.map((errorMessage, i) => (
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
              value={birthday.value}
              className={moduleStyles.inquiryField}
              max={new Date().toISOString().slice(0, 10)}
              onChange={handleBirthdayChange}
              aria-describedby="birthday-error"
            />
            <div id="birthday-error" aria-live="polite" aria-atomic >
              {birthday.errors.map((errorMessage, i) => (
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
              value={instagram.value}
              className={moduleStyles.inquiryField}
              onChange={handleInstagramChange}
              aria-describedby="instagram-error"
            />
            <div id="instagram-error" aria-live="polite" aria-atomic >
              {instagram.errors.map((errorMessage, i) => (
                <p key={`instagram-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="occasion-field">{slice.primary.occasion_prompt}*</label>
            <textarea
              name="occasion"
              id="occasion-field"
              value={occasion.value}
              className={moduleStyles.inquiryField}
              onChange={handleOccasionChange}
              aria-describedby="occasion-error"
            />
            <div id="occasion-error" aria-live="polite" aria-atomic >
              {occasion.errors.map((errorMessage, i) => (
                <p key={`occasion-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="how-found-field">{slice.primary.how_you_found_us_prompt}*</label>
            <textarea
              name="howFound"
              id="how-found-field"
              value={howFound.value}
              className={moduleStyles.inquiryField}
              onChange={handleHowFoundChange}
              aria-describedby="how-found-error"
            />
            <div id="how-found-error" aria-live="polite" aria-atomic >
              {howFound.errors.map((errorMessage, i) => (
                <p key={`how-found-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="tan-history-field">{slice.primary.tan_history_prompt}*</label>
            <textarea
              name="tanHistory"
              id="tan-history-field"
              value={tanHistory.value}
              className={moduleStyles.inquiryField}
              onChange={handleTanHistoryChange}
              aria-describedby="tan-history-error"
            />
            <div id="tan-history-error" aria-live="polite" aria-atomic >
              {tanHistory.errors.map((errorMessage, i) => (
                <p key={`history-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="desired-results-field">{slice.primary.desired_results_prompt}*</label>
            <textarea
              name="desiredResults"
              id="desired-results-field"
              value={desiredResults.value}
              className={moduleStyles.inquiryField}
              onChange={handleDesiredResultsChange}
              aria-describedby="desired-results-error"
            />
            <div id="desired-results-error" aria-live="polite" aria-atomic >
              {desiredResults.errors.map((errorMessage, i) => (
                <p key={`results-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>

          <div className={moduleStyles.fieldContainer}>
            <label htmlFor="questions-concerns-field">{slice.primary.questions_and_concerns_prompt}</label>
            <textarea
              name="questionsConcerns"
              id="questions-concerns-field"
              value={questionsConcerns.value}
              className={moduleStyles.inquiryField}
              onChange={handleQuestionsConcernsChange}
              aria-describedby="questions-concerns-error"
            />
            <div id="questions-concerns-error" aria-live="polite" aria-atomic >
              {questionsConcerns.errors.map((errorMessage, i) => (
                <p key={`questions-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
          </div>
          <div id="form-error" aria-live="polite" aria-atomic>
            {inquiryState.message && <p>{inquiryState.message}</p>}
          </div>
          <button
            type='submit'
            // disabled={fieldsValidated.fieldsValidated !== fieldsValidated.totalFields}
            className={`${styles.button} ${styles.buttonBrown800}`}
          >
          Submit Inquiry
          </button>
        </form>
      </section>
    </Bounded>
  );
};

export default Contact;
