import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import styles from "./styles.module.css";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="manual" font="display">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="manual" font="display">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
};

type CTAModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default async function CTAModal({ isOpen, onClose }: CTAModalProps) {
  const client = createClient();
  const copy = await client.getSingle("newsletter_cta");

  return (
    <>
      <section className={clsx(styles.ctaModal, { [styles.open]: isOpen })}>
        <PrismicRichText field={copy.data.heading} components={components} />
        <PrismicRichText field={copy.data.body_text} components={components} />
        <form action="">
          <label htmlFor="email" className={styles.emailLabel}>
            <PrismicRichText
              field={copy.data.email_form_label}
              components={components}
            />
          </label>
          <input type="email" id="email" name="email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </>
  );
}
