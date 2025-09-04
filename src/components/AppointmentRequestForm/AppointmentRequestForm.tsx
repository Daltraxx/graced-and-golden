import { AppointmentRequestState, sendAppointmentRequest } from "@/app/lib/actions";
import { useActionState } from "react";


const INITIAL_APPT_REQUEST_STATE = {
  message: "",
  errors: {},
} satisfies AppointmentRequestState;

const AppointmentRequestForm = () => {
  const [appointmentRequestState, formAction, isPending] = useActionState(
      sendAppointmentRequest,
      INITIAL_APPT_REQUEST_STATE
    );
  return (
    <form action={formAction} method="post" noValidate>
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        required
        aria-invalid={Boolean(appointmentRequestState?.errors?.message)}
        aria-describedby="message-error"
      />
      {appointmentRequestState?.errors?.message && (
        <p id="message-error" role="alert">
          {Array.isArray(appointmentRequestState.errors.message)
            ? appointmentRequestState.errors.message.join(", ")
            : String(appointmentRequestState.errors.message)}
        </p>
      )}
      <button type="submit" disabled={isPending}>
        Send Request
      </button>
    </form>
  );
}

export default AppointmentRequestForm;