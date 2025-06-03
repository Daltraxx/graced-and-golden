import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="md" className="text-center">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="">
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
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />
      <PrismicNextImage field={slice.primary.image_left} />
      <PrismicNextImage field={slice.primary.image_center} />
      <PrismicNextImage field={slice.primary.image_right} />
    </Bounded>
  );
};

export default HeroThreeImage;
