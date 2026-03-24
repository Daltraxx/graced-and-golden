import { NewsletterSubscriptionState } from "@/app/lib/schema/NewsletterSubscriptionSchema";
import { useActionState, useEffect } from "react";
import { subscribeToNewsletter } from "@/app/lib/actions/subscribeToNewsletter";
import { NonPrismicButton } from "@/components/Button/Button";
import styles from "./styles.module.css";
import { KeyTextField } from "@prismicio/client";

const INITIAL_SUBSCRIPTION_STATE = {
  message: "",
  errors: {},
  success: false,
} satisfies NewsletterSubscriptionState;

type SubscriptionFormProps = {
  // Note: onSuccess can return void or a cleanup function
  onSuccess?: () => void | (() => void);
  labelText?: KeyTextField | string;
  submitText?: KeyTextField | string;
};

// No-operation function used as a default for onSuccess prop
const noop = () => {};

/**
 * A subscription form component that allows users to subscribe to a newsletter.
 * 
 * @component
 * @example
 * ```tsx
 * <SubscriptionForm
 *   onSuccess={() => console.log('Subscribed!')}
 *   labelText="Subscribe to our newsletter:"
 *   submitText="Sign Up"
 * />
 * ```
 * 
 * @param {SubscriptionFormProps} props - The component props
 * @param {() => void} [props.onSuccess=noop] - Callback function invoked when subscription is successful
 * @param {string | KeyTextField} [props.labelText="Enter your email:"] - The label text displayed above the email input field
 * @param {string | KeyTextField} [props.submitText="Submit"] - The text displayed on the submit button in its default state
 * 
 * @returns {JSX.Element} A form element containing an email input field, validation messages, and a submit button
 * 
 * @remarks
 * - Uses React's `useActionState` hook to handle form submission with server action `subscribeToNewsletter`
 * - Includes a honeypot "surname" field to prevent spam bot submissions
 * - Provides accessibility features including ARIA attributes for error states and alert roles
 * - The submit button is disabled during submission and after successful subscription
 * - Button text dynamically updates based on submission state: "Submitting...", "Subscribed!", or the provided `submitText`
 */
export default function SubscriptionForm({
  onSuccess = noop,
  labelText = "Enter your email:",
  submitText = "Submit",
}: SubscriptionFormProps) {
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
      return submitText;
    }
  };
  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="subscribe-email" className={styles.label}>
        {labelText}
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
        disabled={isPending || subscriptionState.success}
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
