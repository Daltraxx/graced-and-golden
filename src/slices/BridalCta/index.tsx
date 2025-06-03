import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import styles from '@/styles/styles.module.css';

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className={`italic text-center mb-8`}>
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mb-4">{children}</p>
  )
}

/**
 * Props for `BridalCta`.
 */
export type BridalCtaProps = SliceComponentProps<Content.BridalCtaSlice>;

/**
 * Component for "BridalCta" Slices.
 */
const BridalCta: FC<BridalCtaProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream200}`}>
      <div className={`${styles.flexRow}`}>
        <PrismicNextImage field={slice.primary.image_left} className={`${styles.ctaImage}`}/>
        <div className={`${styles.backgroundBrown300} ${styles.textCream200} ${styles.ctaContentContainer}`}>
          <div className={`${styles.ctaTextContentContainer}`}>
            <PrismicRichText field={slice.primary.heading} components={components}/>
            <PrismicRichText field={slice.primary.body} components={components}/>
            <Button field={slice.primary.bridal_page_link} className={`${styles.buttonCream200}`}/>
          </div>
        </div>
        <PrismicNextImage field={slice.primary.image_right} className={`${styles.ctaImage}`}/>
      </div>
    </Bounded>
  );
};

export default BridalCta;
