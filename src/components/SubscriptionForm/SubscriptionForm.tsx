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

export default function SubscriptionForm({
  onSuccess,
}: {
  onSuccess: () => void | (() => void);
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
