import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import { NonPrismicButton } from "@/components/Button/Button";

import { subscribeToNewsletter } from "@/app/lib/actions/subscribeToNewsletter";
import { NewsletterSubscriptionState } from "@/app/lib/schema/NewsletterSubscriptionSchema";
import { useActionState } from "react";

const INITIAL_SUBSCRIPTION_STATE = {
  message: "",
  errors: {},
  success: false,
} satisfies NewsletterSubscriptionState;

type CTAModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CTAModal({ isOpen, onClose }: CTAModalProps) {
  const [subscriptionState, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    INITIAL_SUBSCRIPTION_STATE,
  );

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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>
            First time here? Sign up for $10 off
          </Dialog.Title>
          <Dialog.Description className={styles.Description}>
            Updates, exclusive deals, last minute openings & pro tips...
            straight to your inbox.
          </Dialog.Description>

          <form action={formAction} className={styles.form}>
            <label htmlFor="subscribe-email">Enter your email:</label>
            <input type="email" id="subscribe-email" name="email" required />
            <NonPrismicButton
              color="olive-brown-700"
              className={styles.submitButton}
              type="submit"
              disabled={isPending || subscriptionState.success}
            >
              {getSubmitButtonText()}
            </NonPrismicButton>
          </form>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
