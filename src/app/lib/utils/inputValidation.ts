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
   const prevNameState = stateObject.name;
   const newNameState = correctLength && regEx.test(nameVal);

   if (prevNameState === newNameState) return;

   if (!prevNameState && newNameState) {
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
   const prevPhoneNumberState = stateObject.phoneNumber;
   const newPhoneNumberState = correctLength && regEx.test(phoneNumberVal);

   if (prevPhoneNumberState === newPhoneNumberState) return;

   if (!prevPhoneNumberState && newPhoneNumberState) {
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
   const prevEmailState = stateObject.email;
   const newEmailState = correctLength && regEx.test(emailVal);

   if (prevEmailState === newEmailState) return;

   if (!prevEmailState && newEmailState) {
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
   const prevBirthdayState = stateObject.birthday;
   const newBirthdayState = correctLength && oldEnough && regEx.test(emailVal);

   if (prevBirthdayState === newBirthdayState) return;

   if (!prevBirthdayState && newBirthdayState) {
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
   const prevInstagramState = stateObject.instagram;
   const newInstagramState = oneLetter && correctLength && regEx.test(instagramVal);

   if (prevInstagramState === newInstagramState) return;

   if (!prevInstagramState && newInstagramState) {
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
   const occasionVal = target.value.trim().toLowerCase();
   // regex common characters for occasion
   const regEx = /^[a-zA-Z0-9._@#!&$\-\/ ]+$/;
   const correctLength = occasionVal.length >= 3 && occasionVal.length <= 300;
   const prevOccasionState = stateObject.occasion;
   const newOccasionState = correctLength && regEx.test(occasionVal);

   if (prevOccasionState === newOccasionState) return;

   if (!prevOccasionState && newOccasionState) {
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