"use client";
import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import SubscriptionForm from "@/components/SubscriptionForm/SubscriptionForm";
import Heading from "@/components/Heading";
import styles from "./styles.module.css";
import Bounded from "@/components/Bounded";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="manual" className={styles.heading}>
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p className={styles.paragraph}>{children}</p>,
};

/**
 * Props for `NewsletterSignup`.
 */
export type NewsletterSignupProps =
  SliceComponentProps<Content.NewsletterSignupSlice>;

/**
 * Component for "NewsletterSignup" Slices.
 */
const NewsletterSignup: FC<NewsletterSignupProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef, 0.5);
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.boundedContainer}
      ref={containerRef}
    >
      <div className={clsx(styles.container, "animated-element")}>
        <PrismicRichText
          field={slice.primary.heading}
          components={components}
        />
        <PrismicRichText
          field={slice.primary.body_text}
          components={components}
        />
        <SubscriptionForm
          labelText={slice.primary.email_form_label}
          submitText={slice.primary.submit_text}
        />
      </div>
    </Bounded>
  );
};

export default NewsletterSignup;
