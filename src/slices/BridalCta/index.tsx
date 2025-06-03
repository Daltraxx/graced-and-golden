import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { components } from '../index';

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h3" size="sm" className="italic">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p>{children}</p>
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
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div>
        <PrismicNextImage field={slice.primary.image_left} />
        <div>
          <PrismicRichText field={slice.primary.heading} components={components}/>
          <PrismicRichText field={slice.primary.body} components={components}/>
          <Button field={slice.primary.bridal_page_link} />
        </div>
        <PrismicNextImage field={slice.primary.image_right} />
      </div>
    </Bounded>
  );
};

export default BridalCta;
