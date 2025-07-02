'use client';

import { Dispatch, SetStateAction } from "react";



export interface FieldState {
   value: string;
   valid: boolean;
   validationHandler: (value: string, stateSetter: Dispatch<SetStateAction<FieldState>>) => void;
   errors: Array<string>;
}

type TestResult = {
   result: boolean;
   errorMessage: string;
}

type TestResults = {
   correctChars: TestResult;
   correctLength: TestResult;
   oldEnough?: TestResult;
   validYear?: TestResult;
}

type ErrorMessages = {
   incorrectChars: string;
   incorrectLength: string;
   underage?: string;
   invalidYear?: string;
}

const errorMessages: Record<string, ErrorMessages> = {
   name: {
      incorrectChars: 'Please enter a valid first and last name.',
      incorrectLength: 'Please enter a name between 4 and 50 characters long.'
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
      incorrectChars: 'Please enter a valid birthday.',
      incorrectLength: 'Please enter a valid birthday.',
      underage: 'You must be at least 10 years old to book a spray tan.',
      invalidYear: 'Please enter a valid birthday.'
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
      incorrectLength: 'Please describe how you found us in between 2 and 300 characters.'
   },
   tanHistory: {
      incorrectChars: 'Please remove uncommon special characters.',
      incorrectLength: 'Please describe your spray tan history in between 2 and 300 characters.'
   },
   desiredResults: {
      incorrectChars: 'Please remove uncommon special characters.',
      incorrectLength: 'Please describe your desired results in between 2 and 300 characters.'
   },
   questionsConcerns: {
      incorrectChars: 'Please remove uncommon special characters.',
      incorrectLength: 'Please describe your questions and concerns in less than 300 characters.'
   }
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

   
   if (errorMessages.underage || errorMessages.invalidYear) {
      if (ageRequirement === null) {
         throw new Error('Age requirement must be provided when handling birthday validation.');
      }
      const birthYear = Number(inputVal.slice(0, 4));
      const currentYear = new Date().getFullYear();
      let oldEnough = (currentYear - birthYear) >= ageRequirement;
      // dont use oldEnough validation error if year is greater than or equal to current year
      if (currentYear <= birthYear) oldEnough = true;
      const validYear = birthYear >= 1925 && birthYear < currentYear;
      testResults.oldEnough = {
         result: oldEnough,
         errorMessage: errorMessages.underage || 'You must be at least 10 years old to book a spray tan.'
      };
      testResults.validYear = {
         result: validYear,
         errorMessage: errorMessages.invalidYear || 'Please enter a valid year.'
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

export const handleNameValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const nameVal = value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const results = createTestResults(nameVal, regEx, 4, 50, errorMessages.name);
   const errors = createErrorMessagesArray(results);

   stateSetter(prev => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handlePhoneNumberValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const phoneNumberVal = value.trim();
   // regex for phone number allowing formatting with parentheses, spaces, dashes, and periods
   const regEx = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
   const results = createTestResults(phoneNumberVal, regEx, 10, 15, errorMessages.phoneNumber);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleEmailValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const emailVal = value.trim();
   // regex for email
   const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const results = createTestResults(emailVal, regEx, 5, 256, errorMessages.email);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleBirthdayValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const birthdayVal = value.trim();
   // regex for birth date
   const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
   const results = createTestResults(birthdayVal, regEx, 10, 10, errorMessages.birthday, 10);
   const errors = createErrorMessagesArray(results);
   
   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleInstagramValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const instagramVal = value.trim();
   // regex for valid instagram handle
   const regEx = /^@?[a-z](?!.*\.\.)(?!.*\.$)[a-z0-9_.]+$/i;
   const results = createTestResults(instagramVal, regEx, 1, 30, errorMessages.instagram);
   const errors = createErrorMessagesArray(results);
   
   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleOccasionValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const occasionVal = value.trim();
   // regex common characters for occasion
   const regEx = /^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/;
   const results = createTestResults(occasionVal, regEx, 2, 300, errorMessages.occasion);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleHowFoundValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const howFoundVal = value.trim();
   // regex common characters for how-found
   const regEx = /^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/;
   const results = createTestResults(howFoundVal, regEx, 2, 300, errorMessages.howFound);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleTanHistoryValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const tanHistoryVal = value.trim();
   // regex common characters for tan history
   const regEx = /^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/;
   const results = createTestResults(tanHistoryVal, regEx, 2, 300, errorMessages.tanHistory);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleDesiredResultsValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const desiredResultsVal = value.trim();
   // regex common characters for desired results
   const regEx = /^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/;
   const results = createTestResults(desiredResultsVal, regEx, 2, 300, errorMessages.desiredResults);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}

export const handleQuestionsConcernsValidation = (
   value: string,
   stateSetter: Dispatch<SetStateAction<FieldState>>
): void => {
   const questionsConcernsVal = value.trim();
   // regex common characters for questions and concerns
   const regEx = /^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/;
   const results = createTestResults(questionsConcernsVal, regEx, 0, 300, errorMessages.questionsConcerns);
   const errors = createErrorMessagesArray(results);

   stateSetter((prev) => ({
      ...prev,
      valid: !errors.length,
      errors: errors
   }))
   // console.log('state updated');
}