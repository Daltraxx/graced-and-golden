import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/InfoListWideImage/styles.module.css'

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="lg" className="italic text-center p-4">
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="">
        {children}
    </Heading>
  ),
  list: ({children}) => (
    <ul className={`${moduleStyles.list}`}>{children}</ul>
  )
  
}

/**
 * Props for `InfoListWideImage`.
 */
export type InfoListWideImageProps =
  SliceComponentProps<Content.InfoListWideImageSlice>;

/**
 * Component for "InfoListWideImage" Slices.
 */
const InfoListWideImage: FC<InfoListWideImageProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream300}`}>
      <div className={`${moduleStyles.row} ${styles.backgroundBrown300}`}>
        <div style={{ backgroundImage: `url(${slice.primary.background_image.url})` }} className={`${moduleStyles.leftContainer}`}>
          <PrismicRichText field={slice.primary.heading} components={components} />
        </div>
        <div className={`${moduleStyles.rightContainer}`}>
          <PrismicRichText field={slice.primary.list} components={components} />
        </div>
      </div>
    </Bounded>
  );
};

export default InfoListWideImage;
