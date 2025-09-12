import {
  AppointmentRequestState,
  sendAppointmentRequest,
} from "@/app/lib/actions";
import clsx from "clsx";
import { useActionState } from "react";
import moduleStyles from "@/components/AppointmentRequestForm/styles.module.css";
import buttonStyles from "@/components/Button/styles.module.css";

const INITIAL_APPT_REQUEST_STATE = {
  message: "",
  errors: {},
} satisfies AppointmentRequestState;

const AppointmentRequestForm = ({ className }: { className?: string }) => {
  const [appointmentRequestState, formAction, isPending] = useActionState(
    sendAppointmentRequest,
    INITIAL_APPT_REQUEST_STATE
  );
  return (
    <form
      action={formAction}
      noValidate
      className={clsx(className, moduleStyles.formContainer)}
    >
      <label htmlFor="message">
        Don&apos;t see an appointment time that works for you? Send us a message in
        the format below:
      </label>
      <textarea
        name="message"
        id="message"
        required
        aria-invalid={Boolean(appointmentRequestState?.errors?.message)}
        aria-describedby="message-error"
      >
        Hi, my name is Jane Doe. I&apos;m looking for an appointment on Thursday,
        Sept 12th in the afternoon, or Friday, Sept. 13th in the morning. My
        spray tan is for my engagement photos on Sept 14th. You can reach me at
        jane@email.com or (000)000-0000.
      </textarea>
      {appointmentRequestState?.message && (
        <p id="message-success" role="alert" className={moduleStyles.successMessage}>
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
        disabled={isPending}
        className={clsx(buttonStyles.button, buttonStyles.buttonBrown500)}
      >
        Send Request
      </button>
    </form>
  );
};

export default AppointmentRequestForm;
