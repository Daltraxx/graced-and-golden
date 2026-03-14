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
 * Component for "Unsubscribe" Slices.
 */
const Unsubscribe: FC<UnsubscribeProps> = ({ slice }) => {
  const [unsubscribedState, setUnsubscribedState] = useState<UnsubscribeResult>(
    { success: false, message: "" },
  );
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const handleClick = async () => {
    if (email) {
      const result = await unsubscribeFromNewsletter(email);
      setUnsubscribedState(result);
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
        <NonPrismicButton color="cream-200" type="button" onClick={handleClick}>
          Unsubscribe
        </NonPrismicButton>
      )}
      {unsubscribedState.message && (
        <p className={styles.paragraph}>{unsubscribedState.message}</p>
      )}
    </Bounded>
  );
};

export default Unsubscribe;
