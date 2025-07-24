'use client';

import { sendInquiryEmail, State } from "@/app/lib/actions";
import { handleNameValidation, handlePhoneNumberValidation } from "@/app/lib/utils/inputValidation";
import { FC, useActionState, useState, useEffect, useMemo } from "react";
import { ContactProps } from "@/slices/Contact";
import { useDebouncedCallback } from "use-debounce";
import {
   handleEmailValidation,
   handleBirthdayValidation,
   handleInstagramValidation,
   handleOccasionValidation,
   handleHowFoundValidation,
   handleTanHistoryValidation,
   handleDesiredResultsValidation,
   handleQuestionsConcernsValidation,
   FieldState
} from "@/app/lib/utils/inputValidation";
import moduleStyles from "@/components/InquiryForm/styles.module.css";
import buttonStyles from '@/components/Button/styles.module.css';
import clsx from "clsx";



const InquiryForm: FC<ContactProps> = ({ slice }) => {
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

   const [formValidated, setFormValidated] = useState(false);
   const fieldStates = useMemo(
      () => [
         name,
         phoneNumber,
         email,
         birthday,
         instagram,
         occasion,
         howFound,
         tanHistory,
         desiredResults,
         questionsConcerns
      ],
      [
         name,
         phoneNumber,
         email,
         birthday,
         instagram,
         occasion,
         howFound,
         tanHistory,
         desiredResults,
         questionsConcerns
      ]
   );
   const fieldStateSetters = [
      setName,
      setPhoneNumber,
      setEmail,
      setBirthday,
      setInstagram,
      setOccasion,
      setHowFound,
      setTanHistory,
      setDesiredResults,
      setQuestionsConcerns
   ];

   useEffect(() => {
      const allFieldsValidated = fieldStates.every((fieldState) => fieldState.valid);
      setFormValidated(allFieldsValidated);
   }, [fieldStates]);

   // If values present from session storage upon mounting, handle validation
   useEffect(() => {
      fieldStates.forEach((_, i) => {
         const state = fieldStates[i];
         const setter = fieldStateSetters[i];
         if (state.value) state.validationHandler(state.value, setter);
      });
   }, []);

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
   

   return (
      <form action={formAction} className={`${moduleStyles.inquiryForm}`} aria-describedby="form-error" >

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="name-field">{slice.primary.name_prompt + '*'}</label>
            <input
              type="text"
              name="name"
              id="name-field"
              value={name.value}
              onChange={handleNameChange}
              className={moduleStyles.inquiryField}
              // onChange={event => handleNameChange(event, fieldsValidated, setFieldsValidated)}
              aria-describedby="name-error"
              autoComplete="name"
            />
            <div id="name-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {name.errors.map((errorMessage, i) => (
                <p key={`name-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="phone-number-field">{slice.primary.phone_number_prompt + '*'}</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phone-number-field"
              value={phoneNumber.value}
              className={moduleStyles.inquiryField}
              onChange={handlePhoneNumberChange}
              aria-describedby="phone-number-error"
              autoComplete="tel-national"
            />
            <div id="phone-number-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {phoneNumber.errors.map((errorMessage, i) => (
                <p key={`phone-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="email-field">{slice.primary.email_prompt + '*'}</label>
            <input
              type="email"
              name="email"
              id="email-field"
              value={email.value}
              className={moduleStyles.inquiryField}
              onChange={handleEmailChange}
              aria-describedby="email-error"
              autoComplete="email"
            />
            <div id="email-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {email.errors.map((errorMessage, i) => (
                <p key={`email-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="birthday-field">{slice.primary.birthday_prompt + '*'}</label>
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
            <div id="birthday-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {birthday.errors.map((errorMessage, i) => (
                <p key={`birthday-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="instagram-field">{slice.primary.instagram_prompt + '*'}</label>
            <input
              type="text"
              name="instagram"
              id="instagram-field"
              value={instagram.value}
              className={moduleStyles.inquiryField}
              onChange={handleInstagramChange}
              aria-describedby="instagram-error"
            />
            <div id="instagram-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {instagram.errors.map((errorMessage, i) => (
                <p key={`instagram-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="occasion-field">{slice.primary.occasion_prompt + '*'}</label>
            <textarea
              name="occasion"
              id="occasion-field"
              value={occasion.value}
              className={moduleStyles.inquiryField}
              onChange={handleOccasionChange}
              aria-describedby="occasion-error"
            />
            <div id="occasion-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {occasion.errors.map((errorMessage, i) => (
                <p key={`occasion-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="how-found-field">{slice.primary.how_you_found_us_prompt + '*'}</label>
            <textarea
              name="howFound"
              id="how-found-field"
              value={howFound.value}
              className={moduleStyles.inquiryField}
              onChange={handleHowFoundChange}
              aria-describedby="how-found-error"
            />
            <div id="how-found-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {howFound.errors.map((errorMessage, i) => (
                <p key={`how-found-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="tan-history-field">{slice.primary.tan_history_prompt + '*'}</label>
            <textarea
              name="tanHistory"
              id="tan-history-field"
              value={tanHistory.value}
              className={moduleStyles.inquiryField}
              onChange={handleTanHistoryChange}
              aria-describedby="tan-history-error"
            />
            <div id="tan-history-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {tanHistory.errors.map((errorMessage, i) => (
                <p key={`history-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>

         <div className={moduleStyles.fieldContainer}>
            <label htmlFor="desired-results-field">{slice.primary.desired_results_prompt + '*'}</label>
            <textarea
              name="desiredResults"
              id="desired-results-field"
              value={desiredResults.value}
              className={moduleStyles.inquiryField}
              onChange={handleDesiredResultsChange}
              aria-describedby="desired-results-error"
            />
            <div id="desired-results-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
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
            <div id="questions-concerns-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic >
              {questionsConcerns.errors.map((errorMessage, i) => (
                <p key={`questions-error-${i}`}>{errorMessage}</p>
              ))}
            </div>
         </div>
         <div id="form-error" className={moduleStyles.errorContainer} aria-live="polite" aria-atomic>
            {inquiryState.message && <p>{inquiryState.message}</p>}
         </div>
         <button
            type='submit'
            disabled={!formValidated}
            className={clsx(moduleStyles.submitButton, buttonStyles.button, buttonStyles.buttonBrown500)}
         >
         Submit Inquiry
         </button>
      </form>
   )
}

export default InquiryForm;