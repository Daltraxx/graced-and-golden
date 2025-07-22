import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="sm" className='' >
      {children}
    </Heading>
  )
}

/**
 * Props for `SimpleHero`.
 */
export type SimpleHeroProps = SliceComponentProps<Content.SimpleHeroSlice>;

/**
 * Component for "SimpleHero" Slices.
 */
const SimpleHero: FC<SimpleHeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div style={{backgroundImage: `url(${slice.primary.background_image.url})`}}>
        <PrismicRichText field={slice.primary.main_heading} />
        <PrismicRichText field={slice.primary.sub_heading} />
      </div>
    </Bounded>
  );
};

export default SimpleHero;
