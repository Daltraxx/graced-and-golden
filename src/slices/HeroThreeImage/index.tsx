import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";
import styles from '@/styles/styles.module.css';
import sliceStyles from '@/slices/HeroThreeImage/styles.module.css';
import Button from "@/components/Button";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="md" className="text-center pt-2">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="px-2">
      {children}
    </p>
  )
}

/**
 * Props for `HeroThreeImage`.
 */
export type HeroThreeImageProps =
  SliceComponentProps<Content.HeroThreeImageSlice>;

/**
 * Component for "HeroThreeImage" Slices.
 */
const HeroThreeImage: FC<HeroThreeImageProps> = ({ slice }) => {
  
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream300}`}>
      <div className={`${sliceStyles.heroContentContainer}`}>
        <div className={`${sliceStyles.textContentContainer}`}>
          <PrismicRichText field={slice.primary.heading} components={components} />
          <PrismicRichText field={slice.primary.body} components={components} />
          <div className={`${sliceStyles.buttonRow} pb-2`}>
            <Button field={slice.primary.button_left} className={`${styles.buttonCream200} ${sliceStyles.button}`} />
            <Button field={slice.primary.button_right} className={`${styles.buttonCream200} ${sliceStyles.button}`} />
          </div>
        </div>
        <PrismicNextImage field={slice.primary.image_left} className={`${sliceStyles.heroImage} ${sliceStyles.hide}`} />
        <PrismicNextImage field={slice.primary.image_center} className={`${sliceStyles.heroImage}`} />
        <PrismicNextImage field={slice.primary.image_right} className={`${sliceStyles.heroImage}`} />
      </div>
    </Bounded>
  );
};

export default HeroThreeImage;
