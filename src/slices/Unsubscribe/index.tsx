"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  SliceComponentProps,
  PrismicRichText,
} from "@prismicio/react";
import { useSearchParams } from "next/navigation";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button, { NonPrismicButton } from "@/components/Button/Button";
import styles from "@/slices/Unsubscribe/styles.module.css";
import unsubscribeFromNewsletter, {
  UnsubscribeResult,
} from "@/app/lib/emailActions/unsubscribeFromNewsletter";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading font="display" size="manual" className={styles.heading}>
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p className={styles.paragraph}>{children}</p>,
};

/**
 * Props for `Unsubscribe`.
 */
export type UnsubscribeProps = SliceComponentProps<Content.UnsubscribeSlice>;
/**
 * Unsubscribe Slice component for handling newsletter unsubscription flow.
 *
 * @param slice - Prismic slice data containing heading, body, and page link.
 * @returns Renders a bounded container with rich text content, an unsubscribe button,
 *          and a message indicating the result of the unsubscription attempt.
 *
 * The component:
 * - Retrieves the user's email from URL search parameters.
 * - Handles the unsubscribe action via `unsubscribeFromNewsletter`.
 * - Displays a success button or an unsubscribe button based on the result.
 * - Shows a message if the unsubscription fails or succeeds.
 */
const Unsubscribe: FC<UnsubscribeProps> = ({ slice }) => {
  const [unsubscribedState, setUnsubscribedState] = useState<UnsubscribeResult>(
    { success: false, message: "" },
  );
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const handleClick = async () => {
    if (email) {
      setIsLoading(true);
      try {
        const result = await unsubscribeFromNewsletter(email);
        setUnsubscribedState(result);
      } catch (error) {
        setUnsubscribedState({
          success: false,
          message:
            "An error occurred while unsubscribing. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setUnsubscribedState({
        success: false,
        message: "No email address provided.",
      });
    }
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.heading} components={components} />
      <PrismicRichText field={slice.primary.body} components={components} />
      {unsubscribedState.success ? (
        <Button field={slice.primary.page_link} color="cream-200" />
      ) : (
        <NonPrismicButton color="cream-200" type="button" onClick={handleClick} disabled={isLoading}>
          Unsubscribe
        </NonPrismicButton>
      )}
      <div className={styles.messageContainer} aria-live="polite">
        {isLoading && <p className={styles.paragraph}>Unsubscribing...</p>}
        {unsubscribedState.message && !isLoading && (
          <p className={styles.paragraph}>{unsubscribedState.message}</p>
        )}
      </div>
    </Bounded>
  );
};

export default Unsubscribe;
