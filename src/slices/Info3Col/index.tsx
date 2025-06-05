import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/Info3Col/styles.module.css';

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className="italic text-center">
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="text-center">
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="p-4">{children}</p>
  ),
}

/**
 * Props for `Info3Col`.
 */
export type Info3ColProps = SliceComponentProps<Content.Info3ColSlice>;

/**
 * Component for "Info3Col" Slices.
 */
const Info3Col: FC<Info3ColProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} verticalMargin={false} className={`${styles.backgroundBrown300} ${styles.textCream200}`} >
      {slice.variation === 'default' && (
        <section>
          <PrismicRichText field={slice.primary.main_heading} components={components} />
          <div className={`${moduleStyles.flexRow}`}>
            <PrismicNextImage field={slice.primary.image_left} className={`${moduleStyles.image} ${moduleStyles.hideImage}`}/>
            <div className={`${moduleStyles.textContentContainer}`}>
              <PrismicRichText field={slice.primary.content_heading} components={components} />
              <PrismicRichText field={slice.primary.text_content_body} components={components} />
            </div>
            <PrismicNextImage field={slice.primary.image_right} className={`${moduleStyles.image}`}/>
          </div>
        </section>
      )}
      {slice.variation === 'noHeadingTextImageText' && (
        <section>
          <div className={`${moduleStyles.flexRow}`}>
            <div className={`${moduleStyles.textContentContainer}`}>
              <PrismicRichText field={slice.primary.text_content_heading_left} components={components} />
              <PrismicRichText field={slice.primary.text_content_body_left} components={components} />
            </div>
            <PrismicNextImage field={slice.primary.image_center} className={`${moduleStyles.image} ${moduleStyles.hideImage}`}/>
            <div className={`${moduleStyles.textContentContainer}`}>
              <PrismicRichText field={slice.primary.text_content_heading_right} components={components} />
              <PrismicRichText field={slice.primary.text_content_body_right} components={components} />
            </div>
          </div>
        </section>
      )}
      
    </Bounded>
  );
};

export default Info3Col;
