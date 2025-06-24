type FieldsValidatedSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type HandleInputValidationEvent = {
   target: HTMLInputElement;
}

const handleNameValidation = <T extends { name: boolean }>(
   { target }: HandleInputValidationEvent,
   stateSetter: FieldsValidatedSetter<T>
): void => {
   const nameValue = target.value.trim();
   // regex for name requiring two words and allows hyphens and apostrophes
   const regEx = /^[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/;
   const minLength = nameValue.length > 4;
   const maxLength = nameValue.length < 50;
   if (minLength && maxLength && regEx.test(nameValue)) {
      stateSetter(prev => ({
         ...prev,
         name: true
      }));
   } else {
      stateSetter(prev => ({
         ...prev,
         name: false
      }));
   }
}

export {
   handleNameValidation
}