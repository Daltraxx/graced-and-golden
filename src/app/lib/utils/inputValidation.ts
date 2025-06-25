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
};

const handleNameValidation = (
   { target }: HandleInputValidationEvent,
   stateSetter: Dispatch<SetStateAction<FieldsValidationState>>
): void => {
   const nameValue = target.value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const minLength = nameValue.length > 4;
   const maxLength = nameValue.length < 50;
   stateSetter(prev => ({
      ...prev,
      name: minLength && maxLength && regEx.test(nameValue)
   }));
   // console.log('state updated');
}

export {
   handleNameValidation
}