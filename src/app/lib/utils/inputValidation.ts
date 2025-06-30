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
   correctAge?: TestResult;
}

type ErrorMessages = {
   incorrectChars: string;
   incorrectLength: string;
   invalidAge?: string;
}

const errorMessages: Record<string, ErrorMessages> = {
   name: {
      incorrectChars: 'Name can only contain letters, hyphens, and apostrophes.',
      incorrectLength: 'Please enter a name between 5 and 50 characters long.'
   },
   phoneNumber: {
      incorrectChars: 'Please enter a valid phone number.',
      incorrectLength: 'Please enter a valid phone number.'
   },
   email: {
      incorrectChars: 'Please enter a valid email address.',
      incorrectLength: 'Please enter a valid email address.'
   },
   birthday: {
      incorrectChars: 'Please enter a valid email address.',
      incorrectLength: 'Please enter a valid email address.',
      invalidAge: 'Must be at least 10 years old.'
   },
   instagram: {
      incorrectChars: 'Please enter a valid Instagram handle.',
      incorrectLength: 'Please enter a valid Instagram handle.'
   },
   occasion: {
      incorrectChars: 'Please remove uncommon special characters.',
      incorrectLength: 'Please enter an occasion description that is between 2 and 300 characters. If no occasion, please enter "None".'
   },
   howFound: {
      incorrectChars: 'Please remove uncommon special characters.',
      incorrectLength: 'Please share how you found us!'
   },
   tanHistory: {
      incorrectChars: 'Please remove uncommon special characters.',
      incorrectLength: 'Please describe your spray tan history in between 2 and 300 characters.'
   },
}

const areStatesEqual = (prevState: FieldState, newState: FieldState): boolean => {
   if (prevState.valid !== newState.valid) return false;
   if (prevState.errors.length !== newState.errors.length) return false;
   for (let i = 0; i < prevState.errors.length; i++) {
      if (prevState.errors[i] !== newState.errors[i]) return false;
   }
   return true;
}

const createTestResults = (inputVal: string, regEx: RegExp, minLength: number, maxLength: number, errorMessages: ErrorMessages, ageRequirement: number | null = null): TestResults => {
   const inputValLength = inputVal.length;
   const isCorrectChars = inputValLength === 0 ? true : regEx.test(inputVal);
   const isCorrectLength = inputValLength >= minLength && inputValLength <= maxLength;
   const testResults: TestResults = {
      correctChars: {
         result: isCorrectChars,
         errorMessage: errorMessages.incorrectChars
      },
      correctLength: {
         result: isCorrectLength,
         errorMessage: errorMessages.incorrectLength
      }
   };

   // if ageRequirement isn't present this will all be ignored, should perhaps throw error if not present when invalidAge is present
   if (errorMessages.invalidAge && ageRequirement) {
      const birthYear = Number(inputVal.slice(0, 4));
      const oldEnough = (new Date().getFullYear() - birthYear) >= ageRequirement;
      testResults.correctAge = {
         result: oldEnough,
         errorMessage: errorMessages.invalidAge
      }
   }

   return testResults;
}

const createErrorMessagesArray = (testResults: TestResults): string[] => {
   const errors: Set<string> = new Set();
   Object.values(testResults).forEach(testResult => {
      if (!testResult.result) errors.add(testResult.errorMessage)
   })

   return [...errors];
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
   const results = createTestResults(phoneNumberVal, regEx, 10, 14, errorMessages.phoneNumber);
   const errors = createErrorMessagesArray(results);

   const prevState = stateObject.phoneNumber;
   const newState: FieldState = {
      valid: !errors.length,
      errors: errors
   }

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

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
   const results = createTestResults(emailVal, regEx, 5, 256, errorMessages.email);
   const errors = createErrorMessagesArray(results);

   const prevState = stateObject.email;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

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
   const birthdayVal = target.value.trim();
   // regex for birth date
   const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
   const results = createTestResults(birthdayVal, regEx, 10, 10, errorMessages.birthDay, 10);
   const errors = createErrorMessagesArray(results);
   
   const prevState = stateObject.birthday;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

   stateSetter((prev) => ({
      ...prev,
      birthday: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
   // console.log('state updated');
}

export const handleInstagramValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const instagramVal = target.value.trim();
   // regex for valid instagram handle
   const regEx = /^[a-z](?!.*\.\.)(?!.*\.$)[a-z0-9_.]+$/i;
   const results = createTestResults(instagramVal, regEx, 2, 30, errorMessages.instagram);
   const errors = createErrorMessagesArray(results);
   
   const prevState = stateObject.instagram;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

   stateSetter((prev) => ({
      ...prev,
      instagram: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
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
   const results = createTestResults(occasionVal, regEx, 2, 300, errorMessages.occasion);
   const errors = createErrorMessagesArray(results);

   const prevState = stateObject.occasion;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

   stateSetter((prev) => ({
      ...prev,
      occasion: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
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
   const results = createTestResults(howFoundVal, regEx, 2, 300, errorMessages.howFound);
   const errors = createErrorMessagesArray(results);

   const prevState = stateObject.howFound;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

   stateSetter((prev) => ({
      ...prev,
      howFound: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
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
   const results = createTestResults(tanHistoryVal, regEx, 2, 300, errorMessages.tanHistory);
   const errors = createErrorMessagesArray(results);

   const prevState = stateObject.tanHistory;
   const newState = {
      valid: !errors.length,
      errors: errors
   };

   if (areStatesEqual(prevState, newState)) return;

   const fieldsValidatedChange = getFieldsValidatedChange(prevState, newState);

   stateSetter((prev) => ({
      ...prev,
      tanHistory: newState,
      fieldsValidated: prev.fieldsValidated + fieldsValidatedChange
   }))
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