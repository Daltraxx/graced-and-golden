import Heading from "@/components/Heading";
import styles from "./styles.module.css";
import clsx from "clsx";

type CTAModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CTAModal({ isOpen, onClose }: CTAModalProps) {
  return (
    <>
      <section className={clsx(styles.ctaModal, { [styles.open]: isOpen })}>
        <Heading as="h2" size="manual" font="display">
          Subscribe to our Newsletter
        </Heading>
        <p>
          Updates, exclusive deals, last minute openings & pro tips... straight
          to your inbox.
        </p>
        <form action="">
          <label htmlFor="email" className={styles.emailLabel}>
            Enter your email:
          </label>
          <input type="email" id="email" name="email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </>
  );
}
