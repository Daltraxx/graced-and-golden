import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import SubscriptionForm from "@/components/SubscriptionForm/SubscriptionForm";
import { useCallback } from "react";

type CTAModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * A modal dialog component for capturing email subscriptions with a CTA offer.
 * 
 * @component
 * @param {CTAModalProps} props - The component props
 * @param {boolean} props.isOpen - Controls whether the modal is visible
 * @param {() => void} props.onClose - Callback function triggered when the modal should close
 * 
 * @returns {JSX.Element} A Dialog component with subscription form
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * <CTAModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
 * ```
 * 
 * @remarks
 * - Sets localStorage key "newsletterSubscribed" to "true" on successful subscription
 * - Automatically closes after 2 seconds following a successful subscription
 * - Displays a close button (X icon) for manual dismissal
 */
export default function CTAModal({ isOpen, onClose }: CTAModalProps) {
  const handleSubscriptionSuccess = useCallback(() => {
    localStorage.setItem("newsletterSubscribed", "true");
    const timeout = setTimeout(onClose, 2000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>
            First time here?
            <br />
            Sign up for $10 off
          </Dialog.Title>
          <Dialog.Description className={styles.description}>
            Updates, exclusive deals, last minute openings & pro tips...
            straight to your inbox.
          </Dialog.Description>

          <SubscriptionForm onSuccess={handleSubscriptionSuccess} />

          <Dialog.Close asChild>
            <button className={styles.iconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
