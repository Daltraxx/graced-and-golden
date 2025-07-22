import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/SimpleHero/styles.module.css';

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="manual" className='' fontDisplay={false} >
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
      className={moduleStyles.boundedContainer}
    >
      <div style={{backgroundImage: `url(${slice.primary.background_image.url})`}} className={moduleStyles.heroContainer} >
        <PrismicRichText field={slice.primary.main_heading} components={components} />
        <PrismicRichText field={slice.primary.sub_heading} components={components} />
      </div>
    </Bounded>
  );
};

export default SimpleHero;
