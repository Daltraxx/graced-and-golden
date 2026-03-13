import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  SliceComponentProps,
  PrismicRichText,
} from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";
import styles from "@/slices/Unsubscribe/styles.module.css";

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
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.heading} components={components} />
      <PrismicRichText field={slice.primary.body} components={components} />
      {slice.primary.page_link.map((link, i) => (
        <Button key={`unsubscribe-link-${i}`} field={link} color="cream-200" />
      ))}
    </Bounded>
  );
};

export default Unsubscribe;
