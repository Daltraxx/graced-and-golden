import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import styles from '@/styles/styles.module.css';

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="md" className="italic">
      {children}
    </Heading>
  )
  
}

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center w-10/12 m-auto">
        <PrismicNextImage field={slice.primary.image} width={3259} height={4888} className="h-96 w-auto mx-12"/>
        <div className="text-center place-items-center">
          <PrismicRichText field={slice.primary.heading} components={components}/>
          <Button field={slice.primary.button} className={`${styles.buttonDark} my-4`}/>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
