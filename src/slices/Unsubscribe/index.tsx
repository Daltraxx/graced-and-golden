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
import unsubscribeFromNewsletter from "@/app/lib/emailActions/unsubscribeFromNewsletter";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";
import { Suspense } from "react";

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
 * Unsubscribe component for managing newsletter unsubscription requests.
 * 
 * This component displays an unsubscribe form that extracts an email address from URL search parameters
 * and handles the unsubscription process. It manages loading and result states, providing user feedback
 * through status messages and conditional UI rendering.
 * 
 * @component
 * @param {UnsubscribeProps} props - The component props
 * @param {PrismicSlice} props.slice - The Prismic slice data containing heading, body, and page link content
 * 
 * @returns {React.ReactElement} A bounded container with unsubscribe form, messaging, and conditional navigation
 * 
 * @example
 * // Usage with Prismic slice data
 * <Unsubscribe slice={prismicSliceData} />
 * 
 * @remarks
 * - Requires URL search parameter "email" to be present for unsubscription to proceed
 * - Uses Suspense for lazy loading with a loading fallback due to useSearchParams hook
 * - Displays different UI states: before unsubscribe, loading, and after result
 * - Uses aria-live="polite" for accessible status message announcements
 * - Disables the unsubscribe button during API request
 */
const Unsubscribe: FC<UnsubscribeProps> = ({ slice }) => {
  const [unsubscribedState, setUnsubscribedState] = useState<BrevoActionResponse>(
    { success: false, message: "" },
  );
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const handleClick = async () => {
    if (email) {
      setIsLoading(true);
      const result = await unsubscribeFromNewsletter(email);
      setUnsubscribedState(result);
      setIsLoading(false);
    } else {
      setUnsubscribedState({
        success: false,
        message: "No email address provided.",
      });
    }
  };

  return (
    <Suspense fallback={<p className={styles.paragraph}>Loading...</p>}>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.boundedContainer}
      >
        <PrismicRichText
          field={slice.primary.heading}
          components={components}
        />
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
    </Suspense>
  );
};

export default Unsubscribe;
