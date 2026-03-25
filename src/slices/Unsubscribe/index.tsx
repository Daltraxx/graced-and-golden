"use client";

import { FC, useState, Suspense } from "react";
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
import unsubscribeFromNewsletter from "@/app/lib/emailActions/unsubscribeFromNewsletter";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";

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
 * Renders the unsubscribe content component that allows users to unsubscribe from the newsletter.
 *
 * @component
 * @param {UnsubscribeProps} props - The component props
 * @param {Object} props.slice - The Prismic slice data containing primary field configuration
 * @param {PrismicRichTextType} props.slice.primary.heading - The heading text for the unsubscribe section
 * @param {PrismicRichTextType} props.slice.primary.body - The body text for the unsubscribe section
 * @param {LinkType} props.slice.primary.page_link - The link to navigate to after successful unsubscribe
 * @param {string} props.slice.slice_type - The Prismic slice type identifier
 * @param {string} props.slice.variation - The Prismic slice variation identifier
 *
 * @returns {JSX.Element} The rendered unsubscribe component with heading, body text, and action button
 *
 * @description
 * This component manages the unsubscribe workflow by:
 * - Extracting the email from URL search parameters
 * - Handling the unsubscribe button click to submit the email to the newsletter service
 * - Displaying success/error messages
 * - Showing a loading state during the API request
 * - Rendering a navigation button on successful unsubscribe or a clickable button to trigger the action
 *
 * @throws Does not throw errors directly, but handles failures through the BrevoActionResponse state
 */
const UnsubscribeContent: FC<UnsubscribeProps> = ({ slice }) => {
  const [unsubscribedState, setUnsubscribedState] =
    useState<BrevoActionResponse>({ success: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const handleClick = async () => {
    if (email) {
      try {
        setIsLoading(true);
        const result = await unsubscribeFromNewsletter(email);
        setUnsubscribedState(result);
      } catch (error) {
        console.error("Error unsubscribing from newsletter:", error);
        setUnsubscribedState({
          success: false,
          message: "An unexpected error occurred. Please try again.",
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
        <NonPrismicButton
          color="cream-200"
          type="button"
          onClick={handleClick}
          disabled={isLoading}
        >
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

/**
 * Unsubscribe component that wraps the UnsubscribeContent with a Suspense boundary.
 *
 * This component provides a fallback loading state while the UnsubscribeContent
 * is being loaded asynchronously.
 * This is because the UnsubscribeContent component includes a useSearchParams hook
 * which requires Suspense wrapping.
 *
 * @component
 * @param props - The props to pass to UnsubscribeContent
 * @param props - {@link UnsubscribeProps}
 * @returns A React component with Suspense-wrapped UnsubscribeContent
 * @example
 * ```tsx
 * <Unsubscribe {...props} />
 * ```
 */
const Unsubscribe: FC<UnsubscribeProps> = (props) => {
  return (
    <Suspense fallback={<p className={styles.paragraph}>Loading...</p>}>
      <UnsubscribeContent {...props} />
    </Suspense>
  );
};

export default Unsubscribe;
