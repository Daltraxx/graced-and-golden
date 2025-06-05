import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/Tryptich/styles.module.css';
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className={`${moduleStyles.bodyTextParagraph}`}>{children}</p>
  )
  
}

/**
 * Props for `Tryptich`.
 */
export type TryptichProps = SliceComponentProps<Content.TryptichSlice>;

/**
 * Component for "Tryptich" Slices.
 */
const Tryptich: FC<TryptichProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream200}`}>
      <div className={`${moduleStyles.row}`}>
        <PrismicNextImage field={slice.primary.image_left} />
        <div className={`${moduleStyles.bodyContainer}`}>
          <section className={`${moduleStyles.bodyText}`}>
            <h3 className="mb-2">{slice.primary.small_text}</h3>
            <PrismicRichText field={slice.primary.heading} components={components} />
            <PrismicRichText field={slice.primary.body} components={components} />
            <PrismicNextLink field={slice.primary.link} className={`${moduleStyles.bodyTextLink}`}/>
            <PrismicNextImage field={slice.primary.body_image} />
          </section>
        </div>
        <PrismicNextImage field={slice.primary.image_right} />
      </div>
    </Bounded>
  );
};

export default Tryptich;
