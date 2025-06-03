import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";

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
      <PrismicNextImage field={slice.primary.image_left} />
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />
      <Button field={slice.primary.bridal_page_link} />
      <PrismicNextImage field={slice.primary.image_right} />
    </Bounded>
  );
};

export default BridalCta;
