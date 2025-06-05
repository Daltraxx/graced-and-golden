import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Tryptich`.
 */
export type TryptichProps = SliceComponentProps<Content.TryptichSlice>;

/**
 * Component for "Tryptich" Slices.
 */
const Tryptich: FC<TryptichProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div>
        <PrismicNextImage field={slice.primary.image_left} />
        <section>
          <p>{slice.primary.small_text}</p>
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.body} />
          <PrismicNextLink field={slice.primary.link} />
          <PrismicNextImage field={slice.primary.body_image} />
        </section>
        <PrismicNextImage field={slice.primary.image_right} />
      </div>
    </Bounded>
  );
};

export default Tryptich;
