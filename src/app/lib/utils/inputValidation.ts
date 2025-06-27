'use client';

import { Dispatch, SetStateAction } from "react";

type FieldsValidationState = {
   name: boolean;
   phoneNumber: boolean;
   email: boolean;
   birthday: boolean;
   instagram: boolean;
   occasion: boolean;
   howFound: boolean;
   tanHistory: boolean;
   desiredResults: boolean;
   questionsConcerns: boolean;
   fieldsValidated: number;
   totalFields: number;
};

export const handleNameValidation = (
   { target }: { target: HTMLInputElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const nameVal = target.value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const correctLength = nameVal.length >= 5 && nameVal.length <= 50;
   const prevState = stateObject.name;
   const newState = correctLength && regEx.test(nameVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         name: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         name: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
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
   const correctLength = phoneNumberVal.length >= 10 && phoneNumberVal.length <= 14;
   const prevState = stateObject.phoneNumber;
   const newState = correctLength && regEx.test(phoneNumberVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         phoneNumber: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         phoneNumber: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
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
   const correctLength = emailVal.length >= 5 && emailVal.length <= 256;
   const prevState = stateObject.email;
   const newState = correctLength && regEx.test(emailVal);

   if (prevState === newState) return;

   if (!prevState && newState) {
      stateSetter(prev => ({
         ...prev,
         email: true,
         fieldsValidated: prev.fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         email: false,
         fieldsValidated: prev.fieldsValidated - 1
      }));
   }
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
   const correctLength = emailVal.length === 10;
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
   const correctLength = instagramVal.length >= 3 && instagramVal.length <= 30;
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
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ ]+$/;
   const correctLength = occasionVal.length >= 3 && occasionVal.length <= 300;
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
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ ]+$/;
   const correctLength = howFoundVal.length >= 3 && howFoundVal.length <= 300;
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

export const handleDesiredResultsValidation = (
   { target }: { target: HTMLTextAreaElement },
   stateObject: FieldsValidationState,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const desiredResultsVal = target.value.trim();
   // regex common characters for desired results
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ ]+$/;
   const correctLength = desiredResultsVal.length >= 3 && desiredResultsVal.length <= 300;
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