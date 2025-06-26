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

const handleNameValidation = (
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

   const { fieldsValidated } = stateObject;

   if (!prevNameState && newNameState) {
      stateSetter(prev => ({
         ...prev,
         name: true,
         fieldsValidated: fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         name: false,
         fieldsValidated: fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

const handlePhoneNumberValidation = (
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

   const { fieldsValidated } = stateObject;

   if (!prevPhoneNumberState && newPhoneNumberState) {
      stateSetter(prev => ({
         ...prev,
         phoneNumber: true,
         fieldsValidated: fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         phoneNumber: false,
         fieldsValidated: fieldsValidated - 1
      }));
   }
   console.log('state updated');
   
}

export {
   handleNameValidation
}