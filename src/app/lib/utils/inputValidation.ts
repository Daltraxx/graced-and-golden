'use client';

import { Dispatch, SetStateAction } from "react";

type HandleInputValidationEvent = {
   target: HTMLInputElement;
}

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
   reqFieldsValidated: number;
   totalReqFields: number;
};

const handleNameValidation = (
   { target }: HandleInputValidationEvent,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>,
   prevNameState: boolean,
   fieldsValidated: number
): void => {
   const nameValue = target.value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const minLength = nameValue.length > 4;
   const maxLength = nameValue.length < 50;
   const newNameState = minLength && maxLength && regEx.test(nameValue);
   if (prevNameState === newNameState) return;
   if (!prevNameState && newNameState) {
      stateSetter(prev => ({
         ...prev,
         name: true,
         reqFieldsValidated: fieldsValidated + 1
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         name: false,
         reqFieldsValidated: fieldsValidated - 1
      }));
   }
   // console.log('state updated');
}

export {
   handleNameValidation
}