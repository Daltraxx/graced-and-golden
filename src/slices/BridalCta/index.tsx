import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/BridalCta/styles.module.css';

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className={`italic font-bold text-center mb-2 lg:mb-4`}>
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mb-2 lg:mb-4">{children}</p>
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
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${moduleStyles.container}`} horizontalSpacing={false}>
      <div className={`${moduleStyles.rowContainer}`}>
        <PrismicNextImage field={slice.primary.image_left} className={`${moduleStyles.ctaImage} ${moduleStyles.box}`}/>
        <div className={`${moduleStyles.ctaContentContainer} ${moduleStyles.box}`}>
          <div className={`${moduleStyles.ctaTextContentContainer}`}>
            <PrismicRichText field={slice.primary.heading} components={components}/>
            <PrismicRichText field={slice.primary.body} components={components}/>
            <Button field={slice.primary.bridal_page_link} color="cream-200" className={moduleStyles.button} />
          </div>
        </div>
        <PrismicNextImage field={slice.primary.image_right} className={`${moduleStyles.ctaImage} ${moduleStyles.box}`}/>
      </div>
    </Bounded>
  );
};

export default BridalCta;
