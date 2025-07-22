import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/ParagraphImageOverlap/styles.module.css';

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className='' fontDisplay={false} >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p>{children}</p>
  )
}

/**
 * Props for `ParagraphImageOverlap`.
 */
export type ParagraphImageOverlapProps =
  SliceComponentProps<Content.ParagraphImageOverlapSlice>;

/**
 * Component for "ParagraphImageOverlap" Slices.
 */
const ParagraphImageOverlap: FC<ParagraphImageOverlapProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <section>
          <PrismicRichText field={slice.primary.heading} components={components} />
          <PrismicRichText field={slice.primary.body_text} components={components} />
        </section>
        <div style={{ backgroundImage: `url(${slice.primary.image.url})`}}></div>
      </div>
    </Bounded>
  );
};

export default ParagraphImageOverlap;
