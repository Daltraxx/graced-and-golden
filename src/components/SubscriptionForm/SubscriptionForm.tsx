import { NewsletterSubscriptionState } from "@/app/lib/schema/NewsletterSubscriptionSchema";
import { useActionState, useEffect } from "react";
import { subscribeToNewsletter } from "@/app/lib/actions/subscribeToNewsletter";
import { NonPrismicButton } from "@/components/Button/Button";
import styles from "./styles.module.css";

const INITIAL_SUBSCRIPTION_STATE = {
  message: "",
  errors: {},
  success: false,
} satisfies NewsletterSubscriptionState;

/**
 * A subscription form component that allows users to subscribe to a newsletter.
 *
 * @component
 * @example
 * ```tsx
 * <SubscriptionForm onSuccess={() => console.log('Subscribed!')} />
 * ```
 *
 * @param {Object} props - Component props
 * @param {() => void | (() => void)} [props.onSuccess] - Callback function executed when subscription is successful.
 *                                                      Can return void or a function that returns void.
 *
 * @returns {React.ReactElement} A form element with email input, validation messages, and submit button.
 *
 * @remarks
 * - Uses the `useActionState` hook to manage form submission state
 * - Displays validation errors for the email field
 * - Shows different button text based on submission state (pending, success, or initial)
 * - Disables the submit button during submission and after successful subscription
 * - Uses proper accessibility attributes (aria-describedby, aria-invalid, role)
 * - Includes a hidden honeypot field to prevent spam bot submissions
 * - onSuccess should be memoized by the parent component to prevent unnecessary re-renders of the form
 */
export default function SubscriptionForm({
  onSuccess = () => {},
}: {
  // Note: onSuccess can return void or a cleanup function
  onSuccess?: () => void | (() => void);
}) {
  const [subscriptionState, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    INITIAL_SUBSCRIPTION_STATE,
  );

  useEffect(() => {
    if (!subscriptionState.success) return;
    return onSuccess();
  }, [subscriptionState.success, onSuccess]);

  const getSubmitButtonText = () => {
    if (isPending) {
      return "Submitting...";
    } else if (subscriptionState.success) {
      return "Subscribed!";
    } else {
      return "Submit";
    }
  };
  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="subscribe-email" className={styles.label}>
        Enter your email:
      </label>

      {/* Honeypot field to prevent spam bots */}
      <input
        type="text"
        name="surname"
        className={styles.nameInput}
        autoComplete="off"
      />

      <input
        type="email"
        id="subscribe-email"
        name="email"
        required
        autoComplete="email"
        className={styles.input}
        aria-describedby={
          subscriptionState.errors?.email ? "email-error" : undefined
        }
        aria-invalid={!!subscriptionState.errors?.email}
      />
      {subscriptionState.errors?.email && (
        <span id="email-error" className={styles.error} role="alert">
          {subscriptionState.errors.email}
        </span>
      )}
      {subscriptionState.message && (
        <span className={styles.message} role="alert">
          {subscriptionState.message}
        </span>
      )}
      <NonPrismicButton
        color="olive-brown-700"
        className={styles.submitButton}
        type="submit"
        disabled={isPending || subscriptionState.success}
      >
        {getSubmitButtonText()}
      </NonPrismicButton>
    </form>
  );
}
