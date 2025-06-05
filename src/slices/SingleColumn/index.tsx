import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/SingleColumn/styles.module.css';

/**
 * Props for `SingleColumn`.
 */
export type SingleColumnProps = SliceComponentProps<Content.SingleColumnSlice>;

/**
 * Component for "SingleColumn" Slices.
 */
const SingleColumn: FC<SingleColumnProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream300}`}>
      <div style={{ backgroundImage: `url(${slice.primary.background_image.url})`}} className={`${moduleStyles.container}`}>
        <PrismicRichText field={slice.primary.heading} />
        <PrismicRichText field={slice.primary.body} />
        <PrismicNextLink field={slice.primary.link_left} />
        <PrismicNextLink field={slice.primary.link_right} />
      </div>
    </Bounded>
  );
};

export default SingleColumn;
