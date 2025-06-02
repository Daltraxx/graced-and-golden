import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button";
// import styles from '@/styles/styles.module.css';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
        <PrismicNextImage field={slice.primary.image} width={3259} height={4888} className="h-96 w-auto"/>
        <div>
          <PrismicRichText field={slice.primary.heading} />
          <Button field={slice.primary.button} />
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
