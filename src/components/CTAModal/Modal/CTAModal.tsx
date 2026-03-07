import Heading from "@/components/Heading";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import { NonPrismicButton } from "@/components/Button/Button";
import clsx from "clsx";

type CTAModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CTAModal({ isOpen, onClose }: CTAModalProps) {
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

          <form action="">
            <label htmlFor="subscribe-email">Enter your email:</label>
            <input type="email" id="subscribe-email" name="email" />
            <Dialog.Close asChild>
              <NonPrismicButton
                color="olive-brown-700"
                className={styles.submitButton}
                type="submit"
              >
                Submit
              </NonPrismicButton>
            </Dialog.Close>
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
