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
   const nameValue = target.value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const correctLength = nameValue.length >= 5 && nameValue.length <= 50;
   const prevNameState = stateObject.name;
   const newNameState = correctLength && regEx.test(nameValue);

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



export {
   handleNameValidation
}