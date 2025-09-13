import {
  AppointmentRequestState,
  sendAppointmentRequest,
} from "@/app/lib/actions";
import clsx from "clsx";
import { useActionState, useState, useEffect } from "react";
import moduleStyles from "@/components/AppointmentRequestForm/styles.module.css";
import buttonStyles from "@/components/Button/styles.module.css";
import { useDebouncedCallback } from "use-debounce";

const INITIAL_APPT_REQUEST_STATE = {
  message: "",
  errors: {},
} satisfies AppointmentRequestState;

const AppointmentRequestForm = ({ className }: { className?: string }) => {
  const [appointmentRequestState, formAction, isPending] = useActionState(
    sendAppointmentRequest,
    INITIAL_APPT_REQUEST_STATE
  );

  const textAreaDefaultText = `Hi, my name is Jane Doe. I'm looking for an appointment on Thursday, Sept. 12th in the afternoon, or Friday, Sept. 13th in the morning. My spray tan is for my engagement photos on Sept. 14th. You can reach me at jane@email.com or (000)000-0000.`;
  const [requestMessage, setRequestMessage] = useState(textAreaDefaultText);
  const [validationState, setValidationState] = useState({
    isValid: false,
    errors: [] as string[],
  });

  const VALIDATION_RULES = {
    MIN_LENGTH: 150,
    MAX_LENGTH: 500,
    ALLOWED_CHARS_PATTERN: /^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/
  } as const;

  const validateAppointmentRequestInput = () => {
    const trimmedRequestMessage = requestMessage.trim();
    const correctLength =
      trimmedRequestMessage.length >= VALIDATION_RULES.MIN_LENGTH &&
      trimmedRequestMessage.length <= VALIDATION_RULES.MAX_LENGTH;
    const validChars = VALIDATION_RULES.ALLOWED_CHARS_PATTERN.test(trimmedRequestMessage);
    const isChanged = trimmedRequestMessage !== textAreaDefaultText;
    const errorMessages = [];
    if (!correctLength) {
      errorMessages.push(
        `Message must be between ${VALIDATION_RULES.MIN_LENGTH} and ${VALIDATION_RULES.MAX_LENGTH} characters.`
      );
    }
    if (!validChars) {
      errorMessages.push("Please remove uncommon special characters.");
    }
    if (!isChanged) {
      errorMessages.push("Please customize the message before submitting.");
    }
    setValidationState({
      isValid: correctLength && validChars && isChanged,
      errors: errorMessages,
    });
  };

  const debounceDelay = 300; // milliseconds
  const debouncedRequestMessageValidation = useDebouncedCallback(
    validateAppointmentRequestInput,
    debounceDelay
  );

  useEffect(() => {
    return () => {
      debouncedRequestMessageValidation.cancel();
    };
  }, [debouncedRequestMessageValidation]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestMessage(e.target.value);
    debouncedRequestMessageValidation();
  };
  
  return (
    <form
      action={formAction}
      noValidate
      className={clsx(className, moduleStyles.formContainer)}
    >
      <label htmlFor="message">
        Don&apos;t see an appointment time that works for you? Send us a message
        in the format below:
      </label>
      <textarea
        name="message"
        id="message"
        required
        aria-invalid={Boolean(appointmentRequestState?.errors?.message)}
        aria-describedby="message-error"
        value={requestMessage}
        onChange={handleTextChange}
      />

      {/* ERROR MESSAGES */}
      {validationState.errors.length > 0 && (
        <div role="alert" aria-live="polite">
          {validationState.errors.map((error, index) => (
            <p key={`error-${index}`} className={moduleStyles.userMessage}>
              {error}
            </p>
          ))}
        </div>
      )}
      {appointmentRequestState?.message && (
        <p
          id="message-success"
          role="alert"
          className={moduleStyles.userMessage}
        >
          {appointmentRequestState.message}
        </p>
      )}
      {appointmentRequestState?.errors?.message && (
        <p id="message-error" role="alert">
          {Array.isArray(appointmentRequestState.errors.message)
            ? appointmentRequestState.errors.message.join(", ")
            : String(appointmentRequestState.errors.message)}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || !validationState.isValid}
        className={clsx(buttonStyles.button, buttonStyles.buttonBrown500)}
      >
        Send Request
      </button>
    </form>
  );
};

export default AppointmentRequestForm;
