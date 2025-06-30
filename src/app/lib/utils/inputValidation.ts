'use client';

import { Dispatch, SetStateAction } from "react";

// change to interfaces? 
type FieldState = {
   valid: boolean;
   errors: Array<string>;
};

type FieldsValidationState = {
   name: FieldState;
   phoneNumber: FieldState;
   email: FieldState;
   birthday: FieldState;
   instagram: FieldState;
   occasion: FieldState;
   howFound: FieldState;
   tanHistory: FieldState;
   desiredResults: FieldState;
   questionsConcerns: FieldState;
   fieldsValidated: number;
   totalFields: number;
};

type TestResult = {
   result: boolean;
   errorMessage: string;
}

type TestResults = {
   correctChars: TestResult;
   correctLength: TestResult;
   defaultErrorMessage?: string;
}

type ErrorMessages = {
   incorrectChars: string;
   incorrectLength: string;
}

const errorMessages: Record<string, ErrorMessages> = {
   name: {
      incorrectChars: 'Name can only contain letters, hyphens, and apostrophes.',
      incorrectLength: 'Please enter a name between 5 and 50 characters long.'
   },
   phoneNumber: {
      incorrectChars: 'Please enter a valid phone number.',
      incorrectLength: 'Please enter a valid phone number.'
   }
}

const areStatesEqual = (prevState: FieldState, newState: FieldState): boolean => {
   if (prevState.valid !== newState.valid) return false;
   if (prevState.errors.length !== newState.errors.length) return false;
   for (let i = 0; i < prevState.errors.length; i++) {
      if (prevState.errors[i] !== newState.errors[i]) return false;
   }
   return true;
}

const createTestResults = (inputVal: string, regEx: RegExp, minLength: number, maxLength: number, { incorrectChars, incorrectLength }: ErrorMessages): TestResults => {
   const inputValLength = inputVal.length;
   const isCorrectChars = inputValLength ? true : regEx.test(inputVal);
   const isCorrectLength = inputValLength >= minLength && inputValLength <= maxLength;
   return {
      correctChars: {
         result: isCorrectChars,
         errorMessage: incorrectChars
      },
      correctLength: {
         result: isCorrectLength,
         errorMessage: incorrectLength
      }
   }
}

const createErrorMessagesArray = ({ correctChars, correctLength }: TestResults): string[] => {
   const errors: string[] = [];
   let sameMessage = false;
   if (correctChars.errorMessage === correctLength.errorMessage) sameMessage = true;
   if (!sameMessage) {
      if (!correctChars.result) errors.push(correctChars.errorMessage);
      if (!correctLength.result) errors.push(correctLength.errorMessage);
   } else {
      if (!correctChars.result || !correctLength.result) errors.push(correctChars.errorMessage);
   }

   return errors;
}

const getFieldsValidatedChange = (prevState: FieldState, newState: FieldState): number => {
   const validityChange = prevState.valid !== newState.valid;
   let fieldsValidatedChange = 0;
   if (validityChange) {
      newState.valid ? fieldsValidatedChange = 1 : fieldsValidatedChange = -1;
   }
   return fieldsValidatedChange;
}

export const handleNameValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const nameVal = target.value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const results = createTestResults(nameVal, regEx, 5, 50, errorMessages.name);
   const errors = createErrorMessagesArray(results);
   
   const prevState = stateObject.name;
   const newState: FieldState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

   stateSetter(prev => ({
      ...prev,
      name: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
   // console.log('state updated');
}

export const handlePhoneNumberValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const phoneNumberVal = target.value.trim();
   // regex for phone number allowing formatting with parentheses, spaces, dashes, and periods
   const regEx = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
   const isCorrectCharacters = phoneNumberVal.length > 0 && regEx.test(phoneNumberVal);
   const isCorrectLength = phoneNumberVal.length >= 10 && phoneNumberVal.length <= 14;
   const errors = [];
   if (!isCorrectCharacters || !isCorrectLength) errors.push('Please enter a valid phone number.');
   const prevState = stateObject.phoneNumber;
   const newState: FieldState = {
      valid: !errors.length,
      errors: errors
   }

   if (areStatesEqual(prevState, newState)) return;

   const validityChange = prevState.valid !== newState.valid;
   let fieldsValidatedChange = 0;
   if (validityChange) {
      newState.valid ? fieldsValidatedChange = 1 : fieldsValidatedChange = -1;
   }

   stateSetter((prev) => ({
      ...prev,
      phoneNumber: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
   // console.log('state updated');
}

export const handleEmailValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const emailVal = target.value.trim();
   // regex for email
   const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const isCorrectCharacters = emailVal.length > 0 && regEx.test(emailVal);
   const isCorrectLength = emailVal.length >= 5 && emailVal.length <= 256;
   const errors = [];
   if (!isCorrectLength || !isCorrectCharacters) errors.push('Please enter a valid email address.');
   const prevState = stateObject.email;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const validityChange = prevState.valid !== newState.valid;
   let fieldsValidatedChange = 0;
   if (validityChange) {
      newState.valid ? fieldsValidatedChange = 1 : fieldsValidatedChange = -1;
   }

   stateSetter((prev) => ({
      ...prev,
      email: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
   // console.log('state updated');
}

export const handleBirthdayValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const emailVal = target.value.trim();
   // regex for birth date
   const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
   const isCorrectLength = emailVal.length === 10;
   const birthYear = Number(emailVal.slice(0, 4));
   // must be at least 10 years old to inquire?
   const oldEnough = (new Date().getFullYear() - birthYear) >= 10;
   const prevState = stateObject.birthday;
   const newState = correctLength && oldEnough && regEx.test(emailVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         birthday: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         birthday: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export const handleInstagramValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const instagramVal = target.value.trim().toLowerCase();
   // regex for valid instagram handle
   const regEx = /^(?!.*\.\.)(?!.*\.$)[a-z0-9_.]+$/i;
   const isCorrectLength = instagramVal.length >= 2 && instagramVal.length <= 30;
   const oneLetter = /[a-zA-Z]/.test(instagramVal[0]);
   const prevState = stateObject.instagram;
   const newState = oneLetter && correctLength && regEx.test(instagramVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         instagram: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         instagram: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export const handleOccasionValidation = (
   { target }: { target: HTMLTextAreaElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const occasionVal = target.value.trim();
   // regex common characters for occasion
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ \n\r]+$/;
   const isCorrectLength = occasionVal.length >= 2 && occasionVal.length <= 300;
   const prevState = stateObject.occasion;
   const newState = correctLength && regEx.test(occasionVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         occasion: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         occasion: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export const handleHowFoundValidation = (
   { target }: { target: HTMLTextAreaElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const howFoundVal = target.value.trim();
   // regex common characters for how-found
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ \n\r]+$/;
   const isCorrectLength = howFoundVal.length >= 2 && howFoundVal.length <= 300;
   const prevState = stateObject.howFound;
   const newState = correctLength && regEx.test(howFoundVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         howFound: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         howFound: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export const handleTanHistoryValidation = (
   { target }: { target: HTMLTextAreaElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const tanHistoryVal = target.value.trim();
   // regex common characters for tan history
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ \n\r]+$/;
   const isCorrectLength = tanHistoryVal.length >= 2 && tanHistoryVal.length <= 300;
   const prevState = stateObject.tanHistory;
   const newState = correctLength && regEx.test(tanHistoryVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         tanHistory: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         tanHistory: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export const handleDesiredResultsValidation = (
   { target }: { target: HTMLTextAreaElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const desiredResultsVal = target.value.trim();
   // regex common characters for desired results
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ \n\r]+$/;
   const isCorrectLength = desiredResultsVal.length >= 2 && desiredResultsVal.length <= 300;
   const prevState = stateObject.desiredResults;
   const newState = correctLength && regEx.test(desiredResultsVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         desiredResults: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         desiredResults: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export const handleQuestionsConcernsValidation = (
   { target }: { target: HTMLTextAreaElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const questionsConcernsVal = target.value.trim();
   // regex common characters for questions and concerns
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ \n\r]+$/;
   const isCorrectLength = questionsConcernsVal.length <= 300;
   const prevState = stateObject.questionsConcerns;
   const newState = questionsConcernsVal.length === 0 ? true : correctLength && regEx.test(questionsConcernsVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         questionsConcerns: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         questionsConcerns: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}